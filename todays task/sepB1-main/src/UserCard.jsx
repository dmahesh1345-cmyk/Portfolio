function UserCard({ user }) {
  const details = [
    { label: "Age", value: user.age },
    { label: "City", value: user.city },
    { label: "Email", value: user.email, type: "email" },
    { label: "Mobile", value: user.mobile, type: "phone" },
    { label: "Occupation", value: user.occupation },
    { label: "Address", value: user.address },
  ];

  return (
    <article className="user-card">
      <div className="card-header">
        <div className="profile-badge">{user.name.charAt(0)}</div>
        <div>
          <h2>{user.name}</h2>
          <p>{user.occupation}</p>
        </div>
      </div>

      <div className="detail-list">
        {details.map((detail) => (
          <div key={detail.label} className="detail-item">
            <span className="label">{detail.label}</span>
            {detail.type === "email" ? (
              <a className="detail-link" href={`mailto:${detail.value}`}>
                {detail.value}
              </a>
            ) : detail.type === "phone" ? (
              <a className="detail-link" href={`tel:${detail.value.replace(/\s+/g, "")}`}>
                {detail.value}
              </a>
            ) : (
              <span className="value">{detail.value}</span>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default UserCard;
