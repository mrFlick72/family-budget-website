export default class DownloadSpentBudgetAsFileUseCase {

    constructor(budgetExpenseFileFileRepository) {
        this.budgetExpenseFileFileRepository = budgetExpenseFileFileRepository;
    }

    getFileFor(downloadSpentBudgetRequest) {
        this.budgetExpenseFileFileRepository.getBudgetExpenseFile({
                month: downloadSpentBudgetRequest.month,
                year: downloadSpentBudgetRequest.year
            },
            downloadSpentBudgetRequest.mediaType)
            .then(content => {
                content.content.then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = downloadSpentBudgetRequest.link;
                    a.href = url;
                    a.download = content.fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
            });
    }
}