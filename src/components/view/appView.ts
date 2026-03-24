import News from './news/news';
import Sources from './sources/sources';
import { EverythingResponse, SourcesResponse } from '../../types/api';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: EverythingResponse): void {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;