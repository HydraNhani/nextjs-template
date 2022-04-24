import Util from "@util";
import { NextRouter, useRouter } from "next/router";
import type { FC } from "react";
import { useEffect } from "react";
import { useAuth as useAuthentication } from "@components/AuthProvider";
import type { NextPageWithConfiguration } from "types";
import { LoadingOverlay } from "@mantine/core";
import { Center } from "@mantine/core";
import Link from "@components/Link";
import { Button } from '@mantine/core';
import type { QueryResultType, MetaProps, User, OperationVariables, gql as GQLType, QueryHookOptions } from "@types";
import { useQuery, gql } from "@apollo/client";
import Constants from "@constants/index";

export const useAuth = useAuthentication;

/**
 * Fetches data and handles errors/loading state/successful state (with Apollo {@link useQuery})
 * @param {FC<{ data: DataProps }>} NextPage The successful page to render
 *
 */
export function useNextPageFetchData<
    DataProps = any,
    Variables = OperationVariables
>(
    NextPage: FC<{ data: DataProps }>,
    requestInfo: {
        setKey: (router: NextRouter, user: User) => string;
        setQuery: (
            gql: typeof GQLType,
            router: NextRouter,
            user: User
        ) => ReturnType<typeof GQLType>;
        setOptions?: (
            router: NextRouter,
            user: User
        ) => QueryHookOptions<
            QueryResultType<DataProps>,
            Variables
        >;
    }
): NextPageWithConfiguration<{ data: Readonly<DataProps> }> {
    const nextPage: NextPageWithConfiguration<{
        data: Readonly<DataProps>;
    }> = () => {
        const router = useRouter();
        const { user } = useAuth();
        const { setKey, setQuery, setOptions } = requestInfo;
        const { data, loading, error } = useQuery<
            QueryResultType<DataProps>,
            Variables
        >(setQuery(gql, router, user!), setOptions?.(router, user!));
        if (error) Util.showNotification({
            message: "An error occurred while fetching the data! Please try again or try a different one!"
        });
        return (
            <>
                <LoadingOverlay visible={loading}>
                    {data && <NextPage data={data[setKey(router, user!)]} />}
                </LoadingOverlay>
                {!loading && (error || !data) && <Center>
                    <Link href="/">
                        <Button className="bg-primary"> Return Home </Button>
                    </Link>    
                </Center>}
            </>
        );
    };
    return nextPage;
}

export function useTitle() {
    const { title } = Util.StateManagement.useSelector((state) => state.layout);
    const dispatch = Util.StateManagement.useDispatch();
    function setTitle(title: string, sameHeader?: boolean) {
        useEffect(() => {
            dispatch(Util.StateManagement.setTitle(title));
            if (sameHeader) dispatch(Util.StateManagement.setHeader(title));
        }, []);
    }
    return { title, setTitle };
}

export function useDescription() {
    const { description } = Util.StateManagement.useSelector(
        (state) => state.layout
    );
    const dispatch = Util.StateManagement.useDispatch();
    function setDescription(description?: string) {
        useEffect(() => {
            dispatch(Util.StateManagement.setDescription(description || Constants.APPLICATION_DESCRIPTION));
        }, []);
    }
    return { description, setDescription };
}

export function useHeader() {
    const { header } = Util.StateManagement.useSelector(
        (state) => state.layout
    );
    const dispatch = Util.StateManagement.useDispatch();
    function setHeader(header: string) {
        useEffect(() => {
            dispatch(Util.StateManagement.setHeader(header));
        }, []);
    }
    return { header, setHeader };
}

export function useScripts() {
    const { scripts } = Util.StateManagement.useSelector(
        (state) => state.layout
    );
    const dispatch = Util.StateManagement.useDispatch();
    function setScripts(scripts: string[]) {
        useEffect(() => {
            dispatch(Util.StateManagement.setScripts(scripts));
        }, []);
    }
    return { scripts, setScripts };
}

export function useMeta() {
    const { meta } = Util.StateManagement.useSelector((state) => state.layout);
    const dispatch = Util.StateManagement.useDispatch();
    function setMeta(meta: MetaProps) {
        useEffect(() => {
            dispatch(Util.StateManagement.setMeta(meta));
        }, []);
    }
    return { meta, setMeta };
}
