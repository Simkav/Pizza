import ACTION from './actionTypes'

export const asideToggle = (data) => {
    return {
        type: ACTION.ASIDE_TOGGLE,
        data: data
    }
} 