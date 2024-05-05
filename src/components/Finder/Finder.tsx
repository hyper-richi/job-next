import { FinderProps } from './Finder.props';
import RegionSelect from '../RegionSelect/RegionSelect';
import styles from './Finder.module.scss';
import ListVacancies from '../ListVacancies/ListVacancies';

export default function Finder({ vacancies, regions, regionCode, searchText, offset, jobCategory }: FinderProps) {
  return (
    <div className={styles.finder}>
      <div className={styles.filters}>
        <div className={styles.filters__header}>
          <h6 className={styles.filters__title}>Фильтры</h6>
        </div>
        <RegionSelect regions={regions} />
      </div>
      <ListVacancies vacancies={vacancies} searchText={searchText} />
    </div>
  );
}
