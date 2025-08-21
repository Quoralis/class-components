import Card from '../Card/Card.tsx';
import type { RootState } from '../../store/store.ts';
import { useSelector } from 'react-redux';

export default function CardsList() {
  const persons = useSelector((state: RootState) => state.addForm.dataUser);
  const lastUser = useSelector(
    (state: RootState) => state.addForm.lastAddedEmail
  );
  if (!persons.length) {
    return <p className="text-muted mt-4">No users yet</p>;
  }

  return (
    <div className="row g-3 mt-4">
      {persons.map((person, index) => (
        <div className={`col-12 col-sm-6 col-lg-4 `} key={index}>
          <Card
            name={person.name}
            age={person.age}
            email={person.email}
            gender={person.gender}
            country={person.country}
            className={
              lastUser === person.email
                ? 'border border-primary bg-primary-subtle rounded-4'
                : 'rounded-3'
            }
          />
        </div>
      ))}
    </div>
  );
}
