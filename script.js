class TextAreaRecorder {
  constructor(recordFormSelector, printFormSelector) {
    this.recordText = recordFormSelector.querySelector(`textarea`);
    this.recordButton = recordFormSelector.querySelector(`button`);

    this.printText = printFormSelector.querySelector(`textarea`);
    this.printButton = printFormSelector.querySelector(`button`);

    this.timestamp = 0;
    this.recordedData = {};
    this.finishRecord;
  }

  init() {
    this.addInputListener();
    this.addRecordButtonListener();
    this.addPrintButtonListener();
  }

  addInputListener() {
    let recordTime, inputValue;

    this.recordText.addEventListener('input', (e) => {
      recordTime = this.calculateTime();

      inputValue = e.target.value;
      this.recordedData[recordTime] = inputValue;
    });
  }

  calculateTime() {
    let tempTime;

    if(this.timestamp == 0) {
      this.timestamp = new Date().getTime();
      return 0;
    }

    tempTime = new Date().getTime() - this.timestamp;
    return tempTime;
  }

  addRecordButtonListener() {
    this.recordButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.saveData();
    });
  }

  saveData() {
    // send to bucket? save to cookie? save to local storage?

    this.finishRecordTime = this.calculateTime();
    console.log(this.recordedData);
  }

  addPrintButtonListener() {
    this.printButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.replayData();
    });
  }

  replayData() {
    if(this.recordedData == {}) return;

    let count = 0;
    let data = this.recordedData;

    let interval = setInterval(() => {
      if(count == this.finishRecordTime) clearInterval(interval);
      if(data[count]) this.printText.value = data[count];

      count++;
    }, 0.1);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let formRecord = document.querySelector('#js-recorder');
  let formPrint = document.querySelector('#js-printer');
  new TextAreaRecorder(formRecord, formPrint).init();
});
