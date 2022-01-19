interface Page<T> {
  page: number;
  dates: {
    maximum: Date;
    minimum: Date;
  };
  total_pages: number;
  total_results: number;
  results: Array<T>;
}

export default Page;
