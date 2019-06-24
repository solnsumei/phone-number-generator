export const getTotalNumberOfGeneratedPhoneNumbers = () => {
  const totalCount = parseInt(localStorage.getItem('totalCount'));

  if (!isNaN(totalCount)) {
    return totalCount;
  }

  return 0;
}

export const setTotalNumberOfGeneratedPhoneNumbers = (numberOfItems) => {
  const totalCount = getTotalNumberOfGeneratedPhoneNumbers() + numberOfItems;
  localStorage.setItem('totalCount', totalCount);
  return totalCount;
}
