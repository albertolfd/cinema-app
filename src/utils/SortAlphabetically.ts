const sortAlphabetically = (stringA: string, stringB: string): number => {
  if (stringA < stringB) {
    return -1;
  }
  if (stringA > stringB) {
    return 1;
  }
  return 0;
};

export default sortAlphabetically;
