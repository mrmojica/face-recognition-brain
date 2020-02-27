import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.state = {
      errorMessage: ""
    };
  }

  handleSubmit = event => {
    const { setRoute, setUser } = this.props;

    event.preventDefault();

    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.nameInput.current.value,
        email: this.emailInput.current.value,
        password: this.passwordInput.current.value
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUser(data.user);
          setRoute("home");
        } else {
          this.setState({ errorMessage: data.errorMessage });
        }
      });
  };

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form onSubmit={this.handleSubmit} className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  ref={this.nameInput}
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  ref={this.emailInput}
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  ref={this.passwordInput}
                  required
                />
              </div>
            </fieldset>
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy" style={{ height: "10px" }}>
              <p className="f5 black db">{this.state.errorMessage}</p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
