import "./SelfIntroduction.css";

function SelfIntroduction() {
  return (
    <div className="intro-card">
      <div className="profile-header">
        <div className="profile-avatar">DM</div>

        <div className="profile-text">
          <h1>D Mahesh</h1>
          <p>dot net Developer | React Developer</p>
        </div>
      </div>

      <div className="intro-content">
        <section>
          <h2>Profile</h2>
          <p>
            Passionate and detail-oriented front-end developer with a strong focus on
            building responsive, user-friendly, and visually appealing web
            experiences. I enjoy turning ideas into clean, scalable interfaces.
          </p>
        </section>

        <section>
          <h2>Education</h2>
          <p>
            Bachelor&apos;s degree in Computer Science / Information Technology from Sri
            Indu College of Engineering and Technology, with a strong interest in
            software development and web technologies.
          </p>
        </section>

        <section>
          <h2>Skills</h2>
          <div className="skills">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>Git</span>
            <span>Responsive Design</span>
            <span>UI/UX Basics</span>
          </div>
        </section>

        <section>
          <h2>Experience</h2>
          <p>
            I have built personal and academic projects focused on front-end
            development, including dynamic web pages and responsive layouts. These
            experiences helped me strengthen my problem-solving and design skills.
          </p>
        </section>

        <section>
          <h2>Hobbies / Interests</h2>
          <p>
            I enjoy coding, learning new technologies, listening to music, exploring
            design trends, and staying updated with the evolving web development
            ecosystem.
          </p>
        </section>

        <section>
          <h2>Career Goal</h2>
          <p>
            My goal is to grow into a skilled full-stack or front-end developer who
            creates meaningful digital products and contributes to innovative projects
            that improve user experiences.
          </p>
        </section>
      </div>
    </div>
  );
}

export default SelfIntroduction;
