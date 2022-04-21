const routes = {
  A: {
    path: '/',
    cord: [0, 0]
  },
  B: {
    path: '/about',
    cord: [2, 2]
  },
  C: {
    path: '/projects',
    cord: [1, 0]
  },
  D: {
    path: '/contact',
    cord: [2, 0]
  }
};

function distance(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

// calculate entry and exit cordinates and rotation
export function getNavigationTransform(fromRoute, toRoute) {
  const from = routes[fromRoute];
  const to = routes[toRoute];
}
