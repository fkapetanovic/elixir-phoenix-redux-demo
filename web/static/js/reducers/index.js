import { combineReducers }        from 'redux'
import { routerReducer }          from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import dialog                     from './dialog'
import jog                        from './jog'
import routing                    from './routing'
import session                    from './session'
import snackbar                   from './snackbar'
import user                       from './user'

export default combineReducers({
  dialog  : dialog,
  form    : formReducer,
  jog     : jog,
  routing : routing,
  session : session,
  snackbar: snackbar,
  user    : user
});
