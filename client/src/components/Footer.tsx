import {useTheme} from "../context/ThemeContext";
function Footer() {
    const {theme} = useTheme();

    return(
        <div>

            <footer
                className={` lg:mt-10 sm: mt-4
                ${theme === 'dark' ? 'text-white' : 'text-black'}
                `}
            >
                Built with ❤️ by You • © 2025 LinkVault
            </footer>
        </div>
    )
}

export default Footer;
