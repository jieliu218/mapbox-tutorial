// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jest-webgl-canvas-mock";
import mapboxgl from "mapbox-gl";

class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = jest.fn();
  }

  postMessage(msg) {
    this.onmessage({ data: msg });
  }
}

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };

// This way does not work
// jest.mock("mapbox-gl", () => ({
//   Map: jest.fn(() => ({
//     on: jest.fn(),
//     remove: jest.fn(),
//   })),
// }));

jest.mock("mapbox-gl", () => ({
  Map: jest.fn(),
  Popup: jest.fn(),
}));

mapboxgl.Map.prototype = {
  on: jest.fn(),
  remove: jest.fn(),
  off: jest.fn(),
  getCanvas: jest.fn(),
};
mapboxgl.Popup.prototype = {
  remove: jest.fn(),
};

global.Worker = Worker;
