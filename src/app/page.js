import styles from "./page.module.css";
import MainClock from "./comp/mainclock";
import AddTask from "./comp/addtask";

/**
 * Home component that renders the main structure of the page.
 * It includes a main clock, a section to add tasks, and a footer with an about link.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function Home() {
  return (
    <div className={styles.page}>
      <MainClock />
      <main className={styles.main}>
        <AddTask />
      </main>
      <footer className={styles.footer}>
        <a href="#" rel="noopener noreferrer">
          About
        </a>
      </footer>
    </div>
  );
}
