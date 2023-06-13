import { render } from '../framework/render.js';
import ButtonPointView from '../view/button-point-view.js';

export default class ButtonPointPresenter {
  #ButtonPointContainer = null;
  #destinationsModel = null;
  #pointsModel = null;
  #offersModel = null;
  #boardPresenter = null;
  #ButtonPointComponent = null;

  constructor({ButtonPointContainer, destinationsModel, pointsModel, offersModel, boardPresenter}) {
    this.#ButtonPointContainer = ButtonPointContainer;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#boardPresenter = boardPresenter;
  }

  init() {
    this.#ButtonPointComponent = new ButtonPointView();
  }

  renderButtonPoint = () => {
    render(this.#ButtonPointComponent, this.#ButtonPointContainer);
    this.#ButtonPointComponent.setClickHandler(this.#handlePointButtonClick);
    if (this.#offersModel.offers.length === 0 || this.#offersModel.isSuccessfulLoading === false ||
      this.#destinationsModel.destinations.length === 0 || this.#destinationsModel.isSuccessfulLoading === false ||
      this.#pointsModel.isSuccessfulLoading === false) {
      this.#ButtonPointComponent.element.disabled = true;
    }
  };

  #handleNewPointFormClose = () => {
    this.#ButtonPointComponent.element.disabled = false;
  };

  #handlePointButtonClick = () => {
    this.#boardPresenter.createPoint(this.#handleNewPointFormClose);
    this.#ButtonPointComponent.element.disabled = true;
  };
}
