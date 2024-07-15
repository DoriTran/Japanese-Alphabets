import { ApSwipeCard } from "@/components";
import styles from "./page.module.scss";

const MainPage = () => {
  return (
    <div className={styles.page}>
      <ApSwipeCard keyword="Keyword" description="Description" />
    </div>
  );
};

export default MainPage;
