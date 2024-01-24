import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer ({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        dispatch({ type: actionTypes.confirm });
    };

    const onError = () => {
        dispatch({ type: actionTypes.error })
    };

    const onWrite = (newValue) => {
        dispatch({ type: actionTypes.write, payload: newValue })
    };

    const onCheck = () => {
       dispatch({ type: actionTypes.check})
    };

    const onDeleted = () => {
        dispatch({ type: actionTypes.deleted })
    };

    const onReset = () => {
       dispatch({ type: actionTypes.reset})
    } 


    React.useEffect(() => {
        console.log("Empezando el efecto");

       if (!!state.loading) {
        setTimeout(() => {
            console.log("Haciendo la validacion");
            
            if (state.value === SECURITY_CODE) {
               onConfirm()  
            } else {
                onError()
            }

            console.log("Terminando la validacion");
        }, 3000);
       }

        console.log("Terminando el efecto");
    }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el codigo de seguridad</p>

            {state.error && (
                <p>Error: el codigo es incorrecto</p>
            )}
             {state.loading && (
                <p>Cargando...</p>
            )}

            <input 
            placeholder="Código de seguridad"
            value={state.value}
            onChange={(event) => {
                onWrite(event.target.value)
            }}/>

            <button 
            onClick={onCheck}
            >Comprobar</button>
        </div>
    )
  } else if (!!state.confirmed && !state.deleted) {
    return (
       <React.Fragment>
        <p>Pedimos confirmación. ¿seguro?</p>
        <button 
        onClick={onDeleted}
        >Sí, eliminar</button>
        <button 
        onClick={onReset}
        >No, me arrepentí</button>
       </React.Fragment> 
    )
  } else {
    return(
        <React.Fragment>
        <p>Eliminado con exito</p>
        <button 
        onClick={onReset}
        >Volver atrás</button>
       </React.Fragment> 
    )
  }
}

const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: "CONFIRM",
    error: "ERROR",
    deleted: "DELETED",
    write: "WRITE",
    reset: "RESET",
};

const reducerObject = (state, payload) => ({

    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.deleted]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false, 
        deleted: false,
        value: "",
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer };
