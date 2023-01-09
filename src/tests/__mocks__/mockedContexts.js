export const getThemeContextMock = (isMobile = false) => ({
  isMobile,
  getIsMobile: () => isMobile
})

export const getUserContextStateMock = (userType = 'default') => ({
  user: {
    type: userType,
  }
})