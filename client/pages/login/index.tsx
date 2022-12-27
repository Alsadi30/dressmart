import React from 'react'
import Base from "../../components/templates/Base/Base";
import LogIn from '../../components/Organisms/Auth/Login/Login';

function Login(): JSX.Element {
    return (
        <>
            <Base >
                <LogIn />
            </Base>
        </>
    )
}

export default Login