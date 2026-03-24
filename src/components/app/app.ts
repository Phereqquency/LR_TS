import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { EverythingResponse, SourcesResponse } from '../../types/api';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesContainer = document.querySelector('.sources');
        
        if (sourcesContainer) {
            sourcesContainer.addEventListener('click', (e: Event) => {
                this.controller.getNews(e as MouseEvent, (data: EverythingResponse) => 
                    this.view.drawNews(data)
                );
            });
        }

        this.controller.getSources((data: SourcesResponse) => this.view.drawSources(data));
    }
}

export default App;