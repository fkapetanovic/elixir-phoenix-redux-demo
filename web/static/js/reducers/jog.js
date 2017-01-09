import * as actions from '../actions/constants'

const initialState = {
  error       : null,
  jogs        : [],
  filter      : {
    start_date: null,
    end_date  : null
  },
  loading     : false,
  report      : [],
  submitting  : false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.DELETE_JOG:
      return { ...state }
    case actions.DELETE_JOG_SUCCESS:
      return {
        ...state,
        jogs: state.jogs.filter(jog => jog.id !== action.response.jog.id)

      }
    case actions.DELETE_JOG_FAILURE:
      return { ...state, error: action.error }
    case actions.FILTER_CHANGED:
      return { ...state, filter: Object.assign(state.filter, action.data) }
    case actions.GET_JOGS:
      return { ...state, loading: true }
    case actions.GET_JOGS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        jogs: getJogsWithExpandedTime(action.response.jogs)
      }
    case actions.GET_JOGS_FAILURE:
      return { ...state, error: action.error, loading: false, jogs: [] }
    case actions.HIDE_DIALOG:
      return { ...state, error: null }    
    case actions.INSERT_JOG:
      return { ...state, submitting: true }
    case actions.INSERT_JOG_SUCCESS:
      return {
        ...state,
        jogs      : [expandTime(action.response.jog), ...state.jogs],
        submitting: false
      }
    case actions.INSERT_JOG_FAILURE:
      return { ...state, error: action.error, submitting: false}
    case actions.JOGS_REPORT:
      return { ...state, loading: true }
    case actions.JOGS_REPORT_SUCCESS:
      return { ...state, error: null, loading: false, report: action.response.report }
    case actions.JOGS_REPORT_FAILURE:
      return { ...state, error: action.error, loading: false, report: [] }
    case actions.SEARCH_JOGS:
      return { ...state, loading: true }
    case actions.SEARCH_JOGS_SUCCESS:
      return {
        ...state,
        error  : null,
        loading: false,
        jogs   :getJogsWithExpandedTime(action.response.jogs)
      }
    case actions.SEARCH_JOGS_FAILURE:
      return { ...state, error: action.error, loading: false }
    case actions.UPDATE_JOG:
      return { ...state, submitting: true }
    case actions.UPDATE_JOG_SUCCESS:
      return {
        ...state,
        jogs: state.jogs.map((jog) => {
          if (jog.id === action.response.jog.id) {
            return expandTime(action.response.jog)
          }
          return jog
        }),
        submitting: false
      }
    case actions.UPDATE_JOG_FAILURE:
      return { ...state, error: action.error, submitting: false }
    default:
      return state
  }
}

function getJogsWithExpandedTime(jogs) {
  return jogs.map((jog) => {
    return expandTime(jog)
  })
}

function expandTime(jog) {
  const time = convertSecondsToTime(jog.time)

  return {
    distance     : jog.distance,
    hours        : time.hours,
    id           : jog.id,
    jog_date     : jog.jog_date,
    minutes      : time.minutes,
    seconds      : time.seconds,
    seconds_total: jog.time
  }
}

function convertSecondsToTime(noOfSeconds) {
  let hours = Math.floor(noOfSeconds / 3600)
  let reminder = noOfSeconds % 3600
  let minutes = Math.floor(reminder / 60)
  let seconds = reminder % 60

  return {
    hours  : hours,
    minutes: minutes,
    seconds: seconds
  }
}
