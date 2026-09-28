import { useSelector } from "react-redux";

function ComponentB() {
  const users = useSelector((state) => state.user.users);

  return (
    <section className="panel data-panel">
      <div className="panel-header">
        <p className="eyebrow">Component B</p>
        <h2>Stored User Data</h2>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>No user data submitted yet.</p>
          <span>Fill the form in Component A to store data globally.</span>
        </div>
      ) : (
        <div className="card-grid">
          {users.map((user) => (
            <article className="info-card" key={user.id}>
              <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
              <div className="card-body">
                <h3>{user.name}</h3>
                <p>{user.role}</p>
                <ul>
                  <li><strong>Email:</strong> {user.email}</li>
                  <li><strong>Phone:</strong> {user.phone}</li>
                  <li><strong>City:</strong> {user.city}</li>
                  <li><strong>Experience:</strong> {user.experience}</li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ComponentB;
