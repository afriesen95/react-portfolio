import { FaLinkedin, FaGithub } from "react-icons/fa";

const IconLinks = ({ iconSize = 50 }) => (
    <div className="icon-links">
        <a href="https://github.com/afriesen95" target="_blank" rel="noreferrer">
            <FaGithub size={iconSize} />
        </a>

        <a
            href="https://www.linkedin.com/in/afriesen95/"
            target="_blank"
            rel="noreferrer"
        >
            <FaLinkedin size={iconSize} />
        </a>
    </div>
);

export default IconLinks;
