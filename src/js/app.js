App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets.
    // $.getJSON('../pets.json', function (data) {
    //   var petsRow = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

    //   for (i = 0; i < data.length; i++) {
    //     petTemplate.find('.panel-title').text(data[i].name);
    //     petTemplate.find('img').attr('src', data[i].picture);
    //     petTemplate.find('.pet-breed').text(data[i].breed);
    //     petTemplate.find('.pet-age').text(data[i].age);
    //     petTemplate.find('.pet-location').text(data[i].location);
    //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     petsRow.append(petTemplate.html());
    //   }
    // });

    return App.initWeb3();
  },

  initWeb3: async function () {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: async function () {
    return new Promise((res, rej) => {
      try {
        $.getJSON('SimpleStorage.json', function (data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var StorageArtifact = data;
          App.contracts.Storage = TruffleContract(StorageArtifact);
          // Set the provider for our contract
          App.contracts.Storage.setProvider(App.web3Provider);
          res();
        });
      }
      catch (err) {
        rej(err);
      }
    });
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

function initialize() {
  return new Promise((res, rej) => {
    try {
      $(function () {
        $(window).on('load', async function () {
          await App.init();
          instance = await App.contracts.Storage.deployed();
          res(instance);
        });
      });
    }
    catch (err) {
      rej(err);
    }
  });
}