import { NextPageWithConfiguration } from "@types";
import { useTitle, useDescription } from "@lib/hooks";

const HomePage: NextPageWithConfiguration<{  }> = ({  }) => {
    //Layout hooks
    const { setTitle } = useTitle();
    const { setDescription } = useDescription();
    //Page information
    setTitle("Home", true);
    setDescription("Some example description");
    return (
        <div> test </div>
    );
};

export default HomePage;