import Page1 from "./pages/overview";
import Page2 from "./pages/earning-structure";
import Page3 from "./pages/governance-structure";
import Page4 from "./pages/intellectual-property";

const Whitepaper = () => {
    return(
        <div style={{minHeight: '100vh'}}>
            <div className="wp-container px-6 py-6">
                <div className="content px-2">
                    <Page1/>
                </div>
            </div>
        </div>
    );
};

export default Whitepaper;