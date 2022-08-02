import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Input, Label, Row, Col, Button } from 'reactstrap';

function Login({setIsAuth}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [hasAccount, setHasAccount] = useState(false);
    let navigate = useNavigate();

    const handleSignup = () => {
        setErrorMsg("");
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMsg(error.message);
            });
    };

    const handleLogin = () => {
        setErrorMsg("");
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMsg(error.message);
            });
    };

    return (
        <div className="loginPage">
            <form>
                <Row className="inputGroup">
                    <Col md={3}>
                        <Label for="emailInput">*Email: </Label>
                        <Input id="emailInput" type="email" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </Row>
                <br />
                <Row className="inputGroup">
                    <Col md={3}>
                        <Label for="passwordInput">*Password: </Label>
                        <Input id="passwordInput" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                </Row>

                <p className="errorMsg">{errorMsg}</p>
                {hasAccount? (
                    <>
                        <Button color="primary" outline onClick={handleLogin}>Sign In</Button>
                        <p>Don't have an account? 
                            <span onClick={() => setHasAccount(!hasAccount)}> <u>Sign up</u>.</span>
                        </p>
                    </>
                ) : (
                    <>
                        <Button color="primary" outline onClick={handleSignup}>Sign Up</Button>
                        <p>Have an account? 
                            <span onClick={() => setHasAccount(!hasAccount)}> <u>Sign in</u>.</span>
                        </p>
                    </>
                )}
            </form>
        </div>
    );
};

export default Login;