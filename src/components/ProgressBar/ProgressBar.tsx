import css from "./ProgressBar.module.scss";

interface Props {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<Props> = ({ completed, total }) => {
  const percent = (completed / total) * 100;
  return (
    <div className={css.progressContainer}>
      <div className={css.progress} style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar;
