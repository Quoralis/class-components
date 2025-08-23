type Users = {
  name: string;
  email: string;
  age: number;
  gender: string;
  country: string;
  className?: string;
  image: string;
};

export default function Card(props: Users) {
  return (
    <div className={`card p-3 shadow-sm mb-3 ${props.className || ''}`}>
      <div className="card-body">
        <h5 className="card-title mb-2">{props.name}</h5>
        <p className="card-text text-muted small mb-2">{props.email}</p>
        <img
          className="img-fluid rounded-circle border border-2 border-primary shadow-sm"
          src={props.image}
          alt="avatar"
        />
        <div className="d-flex flex-wrap gap-4">
          <div>
            <span className="text-secondary small">Age</span>
            <div className="fw-medium">{props.age}</div>
          </div>
          <div>
            <span className="text-secondary small">Gender</span>
            <div className="fw-medium text-capitalize">{props.gender}</div>
          </div>
          <div>
            <span className="text-secondary small">Country</span>
            <div className="fw-medium">{props.country}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
