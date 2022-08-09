describe("searchGiphy", () => {
	// beforeEach(() => {});

	it("should return data", () => {
		const res = searchGiphy("hilarious");
		expect(res.data.pagination.count).toBeGreaterThan(0);
	});

	// afterEach(() => {});
});
