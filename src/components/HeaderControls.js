import NavigationButton from "./NavigationButton";
import ThemeToggler from "./ThemeToggler";

const HeaderControls = ({ theme, toggleTheme }) => (
    <div className="header-controls">
        <NavigationButton />
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
    </div>
);

export default HeaderControls;
