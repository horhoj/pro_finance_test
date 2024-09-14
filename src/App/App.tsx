import styles from './App.module.scss';
import { DefaultLayout } from '~/features/DefaultLayout';
import { FormationOfResiduesWidget } from '~/features/formationOfResidues/FormationOfResiduesWidget';

export function App() {
  return (
    <>
      <div className={styles.App}>
        <DefaultLayout>
          <FormationOfResiduesWidget />
        </DefaultLayout>
      </div>
    </>
  );
}
