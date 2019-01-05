import { actionTypes } from "../constants/action-types";

export const initialState = {
  issues: [],
  selectedIssueValue: "",
  compare: [],
  status: {
    type: "",
    text: "",
    counter: 0
  },
  politicians: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_TO_COMPARE:
      if (
        state.compare.filter(candidate => candidate.id === payload.id).length >
        0
      ) {
        return {
          ...state,
          status: {
            type: "error",
            text: "Candidate has been added already",
            counter: state.status.counter + 1
          }
        };
      } else if (state.compare.length > 1) {
        return {
         ...state,
          status: {
            type: "error",
            text: "You can Only Select Two Candidates",
            counter: state.status.counter + 1
          }
        };
      } else {
        return {
          ...state,
          compare: state.compare.concat(payload),
          status: {
            type: "success",
            text: "Candidate has been added",
            counter: 0
          }
        };
      }
    case actionTypes.REMOVE_FROM_COMPARE:
      return {
        ...state,
        selectedIssueValue: payload,
        compare: state.compare.filter(function(obj) {
          return obj.id !== payload.id;
        }),
        status: {
          type: "success",
          text: "Candidate Removed",
          counter: state.counter + 1
        }
      };

    case actionTypes.LOAD_COMPARE_ISSUES:
      return {
        ...state,
        issues: payload,      };
    case actionTypes.LOAD_COMPARE_POLITICIANS:
      return {
        ...state,
        politicians: payload
      };
    case actionTypes.SET_COMPARE_VALUE:
      if (payload.type == 1) {
        console.log(payload);
        let newCompare = [...state.compare];
        newCompare[0] = payload;
        return {
         ...state,
          compare: newCompare,
        };
      } else if (payload.type == 2) {
        console.log(payload);
        let newCompare = [...state.compare];
        newCompare[1] = payload;
        return {
         ...state, 
          compare: newCompare,   
        };
      } else {
        return {
        ...state,
          status: {
            type: "error",
            text: "Something went wrong",
            counter: state.counter + 1
          }
        };
      }
    case actionTypes.SELECT_ISSUE_VALUE:
      return {
        ...state,
        selectedIssueValue: payload,
        status: {
          type: "success",
          text: "Selected Issue Updated",
          counter: state.counter + 1
        }
      };

    default:
      return state;
  }
};
