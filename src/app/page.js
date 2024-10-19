
import styles from "./page.module.css";
import MainClock from "./comp/mainclock";
import AddTask from "./comp/addtask";

export default function Home() {
    
    return (
      <div className={styles.page}>
        <MainClock />
        <main className={styles.main}>
          <ol>
            <li>Start by selecting Add Task.</li>
          </ol>
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
