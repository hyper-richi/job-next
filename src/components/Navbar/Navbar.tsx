import Link from "next/link";
import styles from "./Navbar.module.css";

const links = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Portfolio",
        url: "/portfolio",
    },
    {
        id: 3,
        title: "Blog",
        url: "/blog",
    },
];

const Navbar = () => {
    return (
        <nav className={styles.container}>
            <Link href="/" className={styles.logo}>
                MyApp
            </Link>
            <div className={styles.links}>
                {links.map((link) => (
                    <Link key={link.id} href={link.url}>
                        {link.title}
                    </Link>
                ))}

                <button className={styles.logout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
