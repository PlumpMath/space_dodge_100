
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', '.git', true, true);
Module['FS_createPath']('/.git', 'hooks', true, true);
Module['FS_createPath']('/.git', 'logs', true, true);
Module['FS_createPath']('/.git/logs', 'refs', true, true);
Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git', 'info', true, true);
Module['FS_createPath']('/.git', 'refs', true, true);
Module['FS_createPath']('/.git/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/refs', 'heads', true, true);
Module['FS_createPath']('/.git', 'objects', true, true);
Module['FS_createPath']('/.git/objects', '4e', true, true);
Module['FS_createPath']('/.git/objects', 'c2', true, true);
Module['FS_createPath']('/.git/objects', '78', true, true);
Module['FS_createPath']('/.git/objects', '77', true, true);
Module['FS_createPath']('/.git/objects', '7e', true, true);
Module['FS_createPath']('/.git/objects', 'ad', true, true);
Module['FS_createPath']('/.git/objects', '43', true, true);
Module['FS_createPath']('/.git/objects', 'pack', true, true);
Module['FS_createPath']('/.git/objects', '53', true, true);
Module['FS_createPath']('/.git/objects', '52', true, true);
Module['FS_createPath']('/.git/objects', '30', true, true);
Module['FS_createPath']('/.git/objects', 'b1', true, true);
Module['FS_createPath']('/.git/objects', '9b', true, true);
Module['FS_createPath']('/.git/objects', '6b', true, true);
Module['FS_createPath']('/.git/objects', '68', true, true);
Module['FS_createPath']('/.git/objects', 'd7', true, true);
Module['FS_createPath']('/.git/objects', '9d', true, true);
Module['FS_createPath']('/.git/objects', 'd6', true, true);
Module['FS_createPath']('/.git/objects', 'f8', true, true);
Module['FS_createPath']('/.git/objects', '0e', true, true);
Module['FS_createPath']('/.git/objects', '6d', true, true);
Module['FS_createPath']('/.git/objects', '36', true, true);
Module['FS_createPath']('/.git/objects', '4a', true, true);
Module['FS_createPath']('/.git/objects', '67', true, true);
Module['FS_createPath']('/.git/objects', 'f1', true, true);
Module['FS_createPath']('/.git/objects', '56', true, true);
Module['FS_createPath']('/.git/objects', '19', true, true);
Module['FS_createPath']('/.git/objects', '6e', true, true);
Module['FS_createPath']('/.git/objects', '1a', true, true);
Module['FS_createPath']('/.git/objects', 'ff', true, true);
Module['FS_createPath']('/.git/objects', '4f', true, true);
Module['FS_createPath']('/.git/objects', 'dd', true, true);
Module['FS_createPath']('/.git/objects', '45', true, true);
Module['FS_createPath']('/.git/objects', '86', true, true);
Module['FS_createPath']('/.git/objects', '2d', true, true);
Module['FS_createPath']('/.git/objects', '20', true, true);
Module['FS_createPath']('/.git/objects', 'b8', true, true);
Module['FS_createPath']('/.git/objects', '61', true, true);
Module['FS_createPath']('/.git/objects', '84', true, true);
Module['FS_createPath']('/.git/objects', '06', true, true);
Module['FS_createPath']('/.git/objects', '7b', true, true);
Module['FS_createPath']('/.git/objects', '49', true, true);
Module['FS_createPath']('/.git/objects', 'b4', true, true);
Module['FS_createPath']('/.git/objects', 'd3', true, true);
Module['FS_createPath']('/.git/objects', '74', true, true);
Module['FS_createPath']('/.git/objects', '00', true, true);
Module['FS_createPath']('/.git/objects', '0f', true, true);
Module['FS_createPath']('/.git/objects', '5e', true, true);
Module['FS_createPath']('/.git/objects', '48', true, true);
Module['FS_createPath']('/.git/objects', '44', true, true);
Module['FS_createPath']('/.git/objects', '3c', true, true);
Module['FS_createPath']('/.git/objects', 'e1', true, true);
Module['FS_createPath']('/.git/objects', 'e7', true, true);
Module['FS_createPath']('/.git/objects', '08', true, true);
Module['FS_createPath']('/.git/objects', '27', true, true);
Module['FS_createPath']('/.git/objects', 'e5', true, true);
Module['FS_createPath']('/.git/objects', 'af', true, true);
Module['FS_createPath']('/.git/objects', '33', true, true);
Module['FS_createPath']('/.git/objects', '02', true, true);
Module['FS_createPath']('/.git/objects', '18', true, true);
Module['FS_createPath']('/.git/objects', 'b3', true, true);
Module['FS_createPath']('/.git/objects', '14', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', '88', true, true);
Module['FS_createPath']('/.git/objects', '7f', true, true);
Module['FS_createPath']('/.git/objects', 'ea', true, true);
Module['FS_createPath']('/.git/objects', 'ee', true, true);
Module['FS_createPath']('/.git/objects', '54', true, true);
Module['FS_createPath']('/.git/objects', '66', true, true);
Module['FS_createPath']('/.git/objects', '8b', true, true);
Module['FS_createPath']('/.git/objects', '10', true, true);
Module['FS_createPath']('/.git/objects', '04', true, true);
Module['FS_createPath']('/.git/objects', '51', true, true);
Module['FS_createPath']('/.git/objects', '0c', true, true);
Module['FS_createPath']('/.git/objects', 'b5', true, true);
Module['FS_createPath']('/.git/objects', '1f', true, true);
Module['FS_createPath']('/.git/objects', '3b', true, true);
Module['FS_createPath']('/', 'video', true, true);
Module['FS_createPath']('/', 'images', true, true);
Module['FS_createPath']('/images', 'alphabet', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 1077, "filename": "/MIT-LICENSE"}, {"audio": 0, "start": 1077, "crunched": 0, "end": 5324, "filename": "/main.lua"}, {"audio": 0, "start": 5324, "crunched": 0, "end": 5758, "filename": "/sfont.lua"}, {"audio": 0, "start": 5758, "crunched": 0, "end": 6887, "filename": "/README.md"}, {"audio": 0, "start": 6887, "crunched": 0, "end": 10899, "filename": "/.git/index"}, {"audio": 0, "start": 10899, "crunched": 0, "end": 11260, "filename": "/.git/COMMIT_EDITMSG"}, {"audio": 0, "start": 11260, "crunched": 0, "end": 11360, "filename": "/.git/FETCH_HEAD"}, {"audio": 0, "start": 11360, "crunched": 0, "end": 11401, "filename": "/.git/ORIG_HEAD"}, {"audio": 0, "start": 11401, "crunched": 0, "end": 11730, "filename": "/.git/config"}, {"audio": 0, "start": 11730, "crunched": 0, "end": 11837, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 11837, "crunched": 0, "end": 11860, "filename": "/.git/HEAD"}, {"audio": 0, "start": 11860, "crunched": 0, "end": 11933, "filename": "/.git/description"}, {"audio": 0, "start": 11933, "crunched": 0, "end": 16831, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 16831, "crunched": 0, "end": 18179, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 18179, "crunched": 0, "end": 18603, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 18603, "crunched": 0, "end": 20245, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 20245, "crunched": 0, "end": 21484, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 21484, "crunched": 0, "end": 25094, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 25094, "crunched": 0, "end": 25638, "filename": "/.git/hooks/pre-receive.sample"}, {"audio": 0, "start": 25638, "crunched": 0, "end": 26534, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 26534, "crunched": 0, "end": 26723, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 26723, "crunched": 0, "end": 27201, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 27201, "crunched": 0, "end": 29541, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 29541, "crunched": 0, "end": 29716, "filename": "/.git/logs/refs/stash"}, {"audio": 0, "start": 29716, "crunched": 0, "end": 30656, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 30656, "crunched": 0, "end": 30856, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 30856, "crunched": 0, "end": 32870, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 32870, "crunched": 0, "end": 33110, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 33110, "crunched": 0, "end": 33151, "filename": "/.git/refs/stash"}, {"audio": 0, "start": 33151, "crunched": 0, "end": 33192, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 33192, "crunched": 0, "end": 33224, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 33224, "crunched": 0, "end": 33265, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 33265, "crunched": 0, "end": 33455, "filename": "/.git/objects/4e/a8587935f213705f348d1a387bcd6dbddf2fce"}, {"audio": 0, "start": 33455, "crunched": 0, "end": 33598, "filename": "/.git/objects/c2/18a2fac29dab576222cc76391c6dcdbb842938"}, {"audio": 0, "start": 33598, "crunched": 0, "end": 33777, "filename": "/.git/objects/78/38cdb2e7cc8109f516e8cfa936075ecf084faa"}, {"audio": 0, "start": 33777, "crunched": 0, "end": 34497, "filename": "/.git/objects/77/7cb9e2eff6fd7fb5baa43b7d673097454fa453"}, {"audio": 0, "start": 34497, "crunched": 0, "end": 35750, "filename": "/.git/objects/7e/be647f8653c7643bddad31226cfb11586447c0"}, {"audio": 0, "start": 35750, "crunched": 0, "end": 35866, "filename": "/.git/objects/7e/c19052e789091c1014a39b2123227aacbe5d4e"}, {"audio": 0, "start": 35866, "crunched": 0, "end": 36037, "filename": "/.git/objects/ad/ffe6d002259fc4330007124661ea566c6f37a3"}, {"audio": 0, "start": 36037, "crunched": 0, "end": 36188, "filename": "/.git/objects/43/09e6791b429eb9377fdb7385cf2b6f37d223fe"}, {"audio": 0, "start": 36188, "crunched": 0, "end": 37932, "filename": "/.git/objects/pack/pack-d0dfb7e288ff68792206cb2a3d79465033585fde.idx"}, {"audio": 0, "start": 37932, "crunched": 0, "end": 178204, "filename": "/.git/objects/pack/pack-d0dfb7e288ff68792206cb2a3d79465033585fde.pack"}, {"audio": 0, "start": 178204, "crunched": 0, "end": 179741, "filename": "/.git/objects/53/41356a4ff64bc20bce16a4058349d4c481cd2f"}, {"audio": 0, "start": 179741, "crunched": 0, "end": 179925, "filename": "/.git/objects/52/8b3761c17fccec52f2c1eb7e1f2f68af5107b7"}, {"audio": 0, "start": 179925, "crunched": 0, "end": 181465, "filename": "/.git/objects/30/f020296612fa3e9b956ba5db6ede645054b996"}, {"audio": 0, "start": 181465, "crunched": 0, "end": 181581, "filename": "/.git/objects/b1/89e9e0d5f2b7359e1a93750ee20ba881357925"}, {"audio": 0, "start": 181581, "crunched": 0, "end": 181724, "filename": "/.git/objects/9b/b93a4becce0bc7ca1d45cc394eaed92a336cd5"}, {"audio": 0, "start": 181724, "crunched": 0, "end": 183261, "filename": "/.git/objects/6b/a97164db2c2994dda77e26ce517082f400913a"}, {"audio": 0, "start": 183261, "crunched": 0, "end": 183377, "filename": "/.git/objects/68/ce814ce7127672272fae03b5b597ecf59d4796"}, {"audio": 0, "start": 183377, "crunched": 0, "end": 183493, "filename": "/.git/objects/d7/42da7082730b8f98119348eac298628f99ec8f"}, {"audio": 0, "start": 183493, "crunched": 0, "end": 183664, "filename": "/.git/objects/9d/eeae652ebe73a6bae1f0f55ac8968caacea8d0"}, {"audio": 0, "start": 183664, "crunched": 0, "end": 183803, "filename": "/.git/objects/d6/d03b98ff9d8a34422cb85d458dd4206d3f80fc"}, {"audio": 0, "start": 183803, "crunched": 0, "end": 183947, "filename": "/.git/objects/f8/a412edfbfcf527618203203692b5fa8a661c3a"}, {"audio": 0, "start": 183947, "crunched": 0, "end": 184083, "filename": "/.git/objects/0e/c8f63859de7092d2af8dac35582e15efb06f88"}, {"audio": 0, "start": 184083, "crunched": 0, "end": 184199, "filename": "/.git/objects/6d/2645436c316132803053e61aa7c0928afc700d"}, {"audio": 0, "start": 184199, "crunched": 0, "end": 184335, "filename": "/.git/objects/36/03c2efdff61ad1963bf8806ea37f10a20efbb5"}, {"audio": 0, "start": 184335, "crunched": 0, "end": 184478, "filename": "/.git/objects/4a/d3dcd7bb1165401642712c4b95917cd8c89cd9"}, {"audio": 0, "start": 184478, "crunched": 0, "end": 480072, "filename": "/.git/objects/67/5c14e51ca234f5ddec6da46b9a66548cc879f2"}, {"audio": 0, "start": 480072, "crunched": 0, "end": 480242, "filename": "/.git/objects/67/90594b15dbc7779e816f7cb91484096a935963"}, {"audio": 0, "start": 480242, "crunched": 0, "end": 480385, "filename": "/.git/objects/f1/f6d8b9e389a1200392905151ff88de76156f6a"}, {"audio": 0, "start": 480385, "crunched": 0, "end": 480554, "filename": "/.git/objects/56/7a65168b8a3d8515d08704ff00b1cf231cf9ff"}, {"audio": 0, "start": 480554, "crunched": 0, "end": 480698, "filename": "/.git/objects/19/e4553c128c9dc67dd9e594ad5e81700ea2f0a2"}, {"audio": 0, "start": 480698, "crunched": 0, "end": 480870, "filename": "/.git/objects/6e/600301db0512d7bd5af0de938f89bb945845b2"}, {"audio": 0, "start": 480870, "crunched": 0, "end": 480955, "filename": "/.git/objects/6e/508fe4182ce328c24d56cd3dd929e0cb5bddc9"}, {"audio": 0, "start": 480955, "crunched": 0, "end": 481106, "filename": "/.git/objects/1a/89c3f0b5a2c2b12b5a368dd3e3f163c6a741bd"}, {"audio": 0, "start": 481106, "crunched": 0, "end": 482055, "filename": "/.git/objects/ff/b0b6804f00cc16276cc26345c49987561ce6d4"}, {"audio": 0, "start": 482055, "crunched": 0, "end": 483178, "filename": "/.git/objects/4f/42566d4cf3b7bfc8d9a000ad5f602342fc7306"}, {"audio": 0, "start": 483178, "crunched": 0, "end": 483312, "filename": "/.git/objects/dd/8980917d38ee5d752144f8724d6da53e36066e"}, {"audio": 0, "start": 483312, "crunched": 0, "end": 483522, "filename": "/.git/objects/45/69342317ace3685e9127267811dfafcfa3b4f2"}, {"audio": 0, "start": 483522, "crunched": 0, "end": 485030, "filename": "/.git/objects/86/8d76c1c1e203be7ff6d66675f4003c3dcc63fc"}, {"audio": 0, "start": 485030, "crunched": 0, "end": 485165, "filename": "/.git/objects/2d/2e721bca159cafffd3feda4d914c0b903f320b"}, {"audio": 0, "start": 485165, "crunched": 0, "end": 486113, "filename": "/.git/objects/20/51336d4b5c022376c0659f556f1e2626f295c4"}, {"audio": 0, "start": 486113, "crunched": 0, "end": 486217, "filename": "/.git/objects/b8/640edcf41181b0bc13932d6d7aebec8c6476f1"}, {"audio": 0, "start": 486217, "crunched": 0, "end": 486348, "filename": "/.git/objects/b8/66b2921c35b096fc81020353d165302f3cd8de"}, {"audio": 0, "start": 486348, "crunched": 0, "end": 486480, "filename": "/.git/objects/61/73a0f6cfe4e781364117d08bc617d63b94dd94"}, {"audio": 0, "start": 486480, "crunched": 0, "end": 486629, "filename": "/.git/objects/84/b774b701e571355eae8131eb593cbcd73875af"}, {"audio": 0, "start": 486629, "crunched": 0, "end": 486760, "filename": "/.git/objects/06/ad1104e3cd40a91d4a50fa4129b44071ef5f4d"}, {"audio": 0, "start": 486760, "crunched": 0, "end": 486895, "filename": "/.git/objects/7b/8a78847d2542ffe8b391cecc9460b59a45259e"}, {"audio": 0, "start": 486895, "crunched": 0, "end": 488404, "filename": "/.git/objects/49/0e916d651990d02124ed3e2110020439514cf7"}, {"audio": 0, "start": 488404, "crunched": 0, "end": 488537, "filename": "/.git/objects/b4/24e0fe8f84c63dfdf983b3a0777e1780269c06"}, {"audio": 0, "start": 488537, "crunched": 0, "end": 488701, "filename": "/.git/objects/d3/369b4a9b59b2300a84bfbcd876ea7499362751"}, {"audio": 0, "start": 488701, "crunched": 0, "end": 488914, "filename": "/.git/objects/74/0159e6e94a793f305aa9e73e33c6574a11d317"}, {"audio": 0, "start": 488914, "crunched": 0, "end": 490283, "filename": "/.git/objects/74/1b8b8bdb9dafa34cdd3d5d1ee2abf47c06321d"}, {"audio": 0, "start": 490283, "crunched": 0, "end": 490431, "filename": "/.git/objects/00/38e882647b4753b404d28b98f6d7c65db82ac4"}, {"audio": 0, "start": 490431, "crunched": 0, "end": 491962, "filename": "/.git/objects/0f/ee67c2278526aaf88ddb39be5e72cc41eb304b"}, {"audio": 0, "start": 491962, "crunched": 0, "end": 492146, "filename": "/.git/objects/5e/8ef80ba9a1489bc539ce0e34da946c60c877d5"}, {"audio": 0, "start": 492146, "crunched": 0, "end": 492314, "filename": "/.git/objects/48/e60caf21bfdfb3df958856d156473ffc3ff41b"}, {"audio": 0, "start": 492314, "crunched": 0, "end": 492445, "filename": "/.git/objects/48/be0808ec526118d6f0e3bea8b9b599f099d41e"}, {"audio": 0, "start": 492445, "crunched": 0, "end": 492575, "filename": "/.git/objects/44/d459b31eb7f043e4972fc5fb1ead49b8119c25"}, {"audio": 0, "start": 492575, "crunched": 0, "end": 492730, "filename": "/.git/objects/44/a5e4d2ff748459ff00a520dc1e39b7a8f756c1"}, {"audio": 0, "start": 492730, "crunched": 0, "end": 492867, "filename": "/.git/objects/3c/3adab306290c73c5a2e26e8e3c104c88cac871"}, {"audio": 0, "start": 492867, "crunched": 0, "end": 493017, "filename": "/.git/objects/3c/2fdec4d2499197e306ba0b1bf05be9d003ca9e"}, {"audio": 0, "start": 493017, "crunched": 0, "end": 493151, "filename": "/.git/objects/e1/a57391bc79a7d47b0668d907a866b113edb297"}, {"audio": 0, "start": 493151, "crunched": 0, "end": 493295, "filename": "/.git/objects/e7/1cc424a8c63c13a6d92484d997bddee2aaa8ac"}, {"audio": 0, "start": 493295, "crunched": 0, "end": 493435, "filename": "/.git/objects/08/81882fe1c99f5b15f39493a689b9a818f0f051"}, {"audio": 0, "start": 493435, "crunched": 0, "end": 494934, "filename": "/.git/objects/27/f171bf0afa008295443386cb2123f979d750dc"}, {"audio": 0, "start": 494934, "crunched": 0, "end": 495100, "filename": "/.git/objects/e5/50a6e613cc4b353985211ab9cb2074dc3e6b49"}, {"audio": 0, "start": 495100, "crunched": 0, "end": 495244, "filename": "/.git/objects/af/2c3be5d40c02915bdbabf0057bd31b3969f1d7"}, {"audio": 0, "start": 495244, "crunched": 0, "end": 495409, "filename": "/.git/objects/33/77829cf3bcd4c78baa04f65e65b0398b4234c8"}, {"audio": 0, "start": 495409, "crunched": 0, "end": 496828, "filename": "/.git/objects/02/dbcf117168d929f7fc3790952406c97b7a96b1"}, {"audio": 0, "start": 496828, "crunched": 0, "end": 496967, "filename": "/.git/objects/18/566d624f6e7abcef9db79cad1509f3de67a7be"}, {"audio": 0, "start": 496967, "crunched": 0, "end": 497221, "filename": "/.git/objects/b3/6ce1cb4f01a4f5e9ac112b2139a5a4022f1b7b"}, {"audio": 0, "start": 497221, "crunched": 0, "end": 497361, "filename": "/.git/objects/b3/3e68c767bd049e0bf5be2ea4f3a768a8c66565"}, {"audio": 0, "start": 497361, "crunched": 0, "end": 497490, "filename": "/.git/objects/14/5b99c7ad61652f89c359714e39fd51daaaa235"}, {"audio": 0, "start": 497490, "crunched": 0, "end": 497606, "filename": "/.git/objects/e6/d62158d03253f9030ba4f3add266d818dcd9ad"}, {"audio": 0, "start": 497606, "crunched": 0, "end": 497746, "filename": "/.git/objects/e6/26e6e215b8fb596f7cb6e47f74977ec1fa0e79"}, {"audio": 0, "start": 497746, "crunched": 0, "end": 497862, "filename": "/.git/objects/88/279d43aeacf17f1ee8eb3a12218826da66bd0b"}, {"audio": 0, "start": 497862, "crunched": 0, "end": 498046, "filename": "/.git/objects/7f/501826027e7397b456cf3ed47290348c304ecb"}, {"audio": 0, "start": 498046, "crunched": 0, "end": 498186, "filename": "/.git/objects/7f/1a12072b75506373f1d0f341518c19daddce5c"}, {"audio": 0, "start": 498186, "crunched": 0, "end": 498353, "filename": "/.git/objects/ea/e9bb2e359d2c8d056908da88dd6b1c8598ad31"}, {"audio": 0, "start": 498353, "crunched": 0, "end": 498490, "filename": "/.git/objects/ee/4eb8e53da8b717f69bd52e523a53cf229d37cd"}, {"audio": 0, "start": 498490, "crunched": 0, "end": 498606, "filename": "/.git/objects/54/1744c36945c385c23b49e67c8d7f9ba959a826"}, {"audio": 0, "start": 498606, "crunched": 0, "end": 498746, "filename": "/.git/objects/66/ee59fff4b9833f9d32fed8d7b16b3741c003e1"}, {"audio": 0, "start": 498746, "crunched": 0, "end": 498880, "filename": "/.git/objects/8b/ac0849cc1693208d3754887dc31b9041df7f64"}, {"audio": 0, "start": 498880, "crunched": 0, "end": 499537, "filename": "/.git/objects/10/313c778519e36f3db6a7844b7ee17c5b17f1a3"}, {"audio": 0, "start": 499537, "crunched": 0, "end": 499683, "filename": "/.git/objects/04/ea2b9d3805bca8623d18ec3caa31246510369c"}, {"audio": 0, "start": 499683, "crunched": 0, "end": 499896, "filename": "/.git/objects/51/069ac07f31bdf6092c80b03cfc004687d100e3"}, {"audio": 0, "start": 499896, "crunched": 0, "end": 501389, "filename": "/.git/objects/0c/38d9c336248369581166cf9c411ace3e278ca7"}, {"audio": 0, "start": 501389, "crunched": 0, "end": 501517, "filename": "/.git/objects/b5/60fb8f6a7b33c377dac5be3e0826e61bf79e77"}, {"audio": 0, "start": 501517, "crunched": 0, "end": 503044, "filename": "/.git/objects/b5/18601236e6bf2fc407534eb4cf0f2efac83ed8"}, {"audio": 0, "start": 503044, "crunched": 0, "end": 503228, "filename": "/.git/objects/b5/d6a3ef777866978f1b70f30992796b52912e0b"}, {"audio": 0, "start": 503228, "crunched": 0, "end": 503371, "filename": "/.git/objects/1f/999cec8bfe141bbaeffe8fa5693ce0d96e2b22"}, {"audio": 0, "start": 503371, "crunched": 0, "end": 503555, "filename": "/.git/objects/3b/d96c421ddbcd053518621a5174532547ac8458"}, {"audio": 0, "start": 503555, "crunched": 0, "end": 961465, "filename": "/video/video2.mp4"}, {"audio": 0, "start": 961465, "crunched": 0, "end": 1096195, "filename": "/video/video3.mp4"}, {"audio": 0, "start": 1096195, "crunched": 0, "end": 1422224, "filename": "/video/Screenshot_20171104_181213.png"}, {"audio": 0, "start": 1422224, "crunched": 0, "end": 1422424, "filename": "/images/ship.png"}, {"audio": 0, "start": 1422424, "crunched": 0, "end": 1422582, "filename": "/images/block.png"}, {"audio": 0, "start": 1422582, "crunched": 0, "end": 1718105, "filename": "/images/background.png"}, {"audio": 0, "start": 1718105, "crunched": 0, "end": 1718504, "filename": "/images/dead.png"}, {"audio": 0, "start": 1718504, "crunched": 0, "end": 1718602, "filename": "/images/checker.png"}, {"audio": 0, "start": 1718602, "crunched": 0, "end": 1718742, "filename": "/images/alphabet/1.png"}, {"audio": 0, "start": 1718742, "crunched": 0, "end": 1718877, "filename": "/images/alphabet/3.png"}, {"audio": 0, "start": 1718877, "crunched": 0, "end": 1719013, "filename": "/images/alphabet/6.png"}, {"audio": 0, "start": 1719013, "crunched": 0, "end": 1719140, "filename": "/images/alphabet/u.png"}, {"audio": 0, "start": 1719140, "crunched": 0, "end": 1719267, "filename": "/images/alphabet/8.png"}, {"audio": 0, "start": 1719267, "crunched": 0, "end": 1719390, "filename": "/images/alphabet/i.png"}, {"audio": 0, "start": 1719390, "crunched": 0, "end": 1719532, "filename": "/images/alphabet/b.png"}, {"audio": 0, "start": 1719532, "crunched": 0, "end": 1719666, "filename": "/images/alphabet/o.png"}, {"audio": 0, "start": 1719666, "crunched": 0, "end": 1719803, "filename": "/images/alphabet/9.png"}, {"audio": 0, "start": 1719803, "crunched": 0, "end": 1719945, "filename": "/images/alphabet/p.png"}, {"audio": 0, "start": 1719945, "crunched": 0, "end": 1720093, "filename": "/images/alphabet/d.png"}, {"audio": 0, "start": 1720093, "crunched": 0, "end": 1720245, "filename": "/images/alphabet/r.png"}, {"audio": 0, "start": 1720245, "crunched": 0, "end": 1720378, "filename": "/images/alphabet/2.png"}, {"audio": 0, "start": 1720378, "crunched": 0, "end": 1720507, "filename": "/images/alphabet/t.png"}, {"audio": 0, "start": 1720507, "crunched": 0, "end": 1720645, "filename": "/images/alphabet/e.png"}, {"audio": 0, "start": 1720645, "crunched": 0, "end": 1720795, "filename": "/images/alphabet/w.png"}, {"audio": 0, "start": 1720795, "crunched": 0, "end": 1720938, "filename": "/images/alphabet/x.png"}, {"audio": 0, "start": 1720938, "crunched": 0, "end": 1721068, "filename": "/images/alphabet/h.png"}, {"audio": 0, "start": 1721068, "crunched": 0, "end": 1721215, "filename": "/images/alphabet/n.png"}, {"audio": 0, "start": 1721215, "crunched": 0, "end": 1721355, "filename": "/images/alphabet/f.png"}, {"audio": 0, "start": 1721355, "crunched": 0, "end": 1721489, "filename": "/images/alphabet/z.png"}, {"audio": 0, "start": 1721489, "crunched": 0, "end": 1721627, "filename": "/images/alphabet/q.png"}, {"audio": 0, "start": 1721627, "crunched": 0, "end": 1721763, "filename": "/images/alphabet/s.png"}, {"audio": 0, "start": 1721763, "crunched": 0, "end": 1721892, "filename": "/images/alphabet/l.png"}, {"audio": 0, "start": 1721892, "crunched": 0, "end": 1722026, "filename": "/images/alphabet/j.png"}, {"audio": 0, "start": 1722026, "crunched": 0, "end": 1722167, "filename": "/images/alphabet/5.png"}, {"audio": 0, "start": 1722167, "crunched": 0, "end": 1722305, "filename": "/images/alphabet/m.png"}, {"audio": 0, "start": 1722305, "crunched": 0, "end": 1722453, "filename": "/images/alphabet/0.png"}, {"audio": 0, "start": 1722453, "crunched": 0, "end": 1722585, "filename": "/images/alphabet/k.png"}, {"audio": 0, "start": 1722585, "crunched": 0, "end": 1722723, "filename": "/images/alphabet/a.png"}, {"audio": 0, "start": 1722723, "crunched": 0, "end": 1722855, "filename": "/images/alphabet/v.png"}, {"audio": 0, "start": 1722855, "crunched": 0, "end": 1722996, "filename": "/images/alphabet/7.png"}, {"audio": 0, "start": 1722996, "crunched": 0, "end": 1723140, "filename": "/images/alphabet/g.png"}, {"audio": 0, "start": 1723140, "crunched": 0, "end": 1723279, "filename": "/images/alphabet/y.png"}, {"audio": 0, "start": 1723279, "crunched": 0, "end": 1723413, "filename": "/images/alphabet/c.png"}, {"audio": 0, "start": 1723413, "crunched": 0, "end": 1723544, "filename": "/images/alphabet/4.png"}], "remote_package_size": 1723544, "package_uuid": "b948d96d-e43f-4b04-b7e8-0ca93f8828c6"});

})();
