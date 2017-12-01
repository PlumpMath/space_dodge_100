
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 1077, "filename": "/MIT-LICENSE"}, {"audio": 0, "start": 1077, "crunched": 0, "end": 6453, "filename": "/main.lua"}, {"audio": 0, "start": 6453, "crunched": 0, "end": 6887, "filename": "/sfont.lua"}, {"audio": 0, "start": 6887, "crunched": 0, "end": 8037, "filename": "/README.md"}, {"audio": 0, "start": 8037, "crunched": 0, "end": 8237, "filename": "/images/ship.png"}, {"audio": 0, "start": 8237, "crunched": 0, "end": 8395, "filename": "/images/block.png"}, {"audio": 0, "start": 8395, "crunched": 0, "end": 303918, "filename": "/images/background.png"}, {"audio": 0, "start": 303918, "crunched": 0, "end": 304317, "filename": "/images/dead.png"}, {"audio": 0, "start": 304317, "crunched": 0, "end": 304415, "filename": "/images/checker.png"}, {"audio": 0, "start": 304415, "crunched": 0, "end": 304555, "filename": "/images/alphabet/1.png"}, {"audio": 0, "start": 304555, "crunched": 0, "end": 304690, "filename": "/images/alphabet/3.png"}, {"audio": 0, "start": 304690, "crunched": 0, "end": 304826, "filename": "/images/alphabet/6.png"}, {"audio": 0, "start": 304826, "crunched": 0, "end": 304953, "filename": "/images/alphabet/u.png"}, {"audio": 0, "start": 304953, "crunched": 0, "end": 305080, "filename": "/images/alphabet/8.png"}, {"audio": 0, "start": 305080, "crunched": 0, "end": 305203, "filename": "/images/alphabet/i.png"}, {"audio": 0, "start": 305203, "crunched": 0, "end": 305345, "filename": "/images/alphabet/b.png"}, {"audio": 0, "start": 305345, "crunched": 0, "end": 305479, "filename": "/images/alphabet/o.png"}, {"audio": 0, "start": 305479, "crunched": 0, "end": 305616, "filename": "/images/alphabet/9.png"}, {"audio": 0, "start": 305616, "crunched": 0, "end": 305758, "filename": "/images/alphabet/p.png"}, {"audio": 0, "start": 305758, "crunched": 0, "end": 305906, "filename": "/images/alphabet/d.png"}, {"audio": 0, "start": 305906, "crunched": 0, "end": 306058, "filename": "/images/alphabet/r.png"}, {"audio": 0, "start": 306058, "crunched": 0, "end": 306191, "filename": "/images/alphabet/2.png"}, {"audio": 0, "start": 306191, "crunched": 0, "end": 306320, "filename": "/images/alphabet/t.png"}, {"audio": 0, "start": 306320, "crunched": 0, "end": 306458, "filename": "/images/alphabet/e.png"}, {"audio": 0, "start": 306458, "crunched": 0, "end": 306608, "filename": "/images/alphabet/w.png"}, {"audio": 0, "start": 306608, "crunched": 0, "end": 306751, "filename": "/images/alphabet/x.png"}, {"audio": 0, "start": 306751, "crunched": 0, "end": 306881, "filename": "/images/alphabet/h.png"}, {"audio": 0, "start": 306881, "crunched": 0, "end": 307028, "filename": "/images/alphabet/n.png"}, {"audio": 0, "start": 307028, "crunched": 0, "end": 307168, "filename": "/images/alphabet/f.png"}, {"audio": 0, "start": 307168, "crunched": 0, "end": 307302, "filename": "/images/alphabet/z.png"}, {"audio": 0, "start": 307302, "crunched": 0, "end": 307440, "filename": "/images/alphabet/q.png"}, {"audio": 0, "start": 307440, "crunched": 0, "end": 307576, "filename": "/images/alphabet/s.png"}, {"audio": 0, "start": 307576, "crunched": 0, "end": 307705, "filename": "/images/alphabet/l.png"}, {"audio": 0, "start": 307705, "crunched": 0, "end": 307839, "filename": "/images/alphabet/j.png"}, {"audio": 0, "start": 307839, "crunched": 0, "end": 307980, "filename": "/images/alphabet/5.png"}, {"audio": 0, "start": 307980, "crunched": 0, "end": 308118, "filename": "/images/alphabet/m.png"}, {"audio": 0, "start": 308118, "crunched": 0, "end": 308266, "filename": "/images/alphabet/0.png"}, {"audio": 0, "start": 308266, "crunched": 0, "end": 308398, "filename": "/images/alphabet/k.png"}, {"audio": 0, "start": 308398, "crunched": 0, "end": 308536, "filename": "/images/alphabet/a.png"}, {"audio": 0, "start": 308536, "crunched": 0, "end": 308668, "filename": "/images/alphabet/v.png"}, {"audio": 0, "start": 308668, "crunched": 0, "end": 308809, "filename": "/images/alphabet/7.png"}, {"audio": 0, "start": 308809, "crunched": 0, "end": 308953, "filename": "/images/alphabet/g.png"}, {"audio": 0, "start": 308953, "crunched": 0, "end": 309092, "filename": "/images/alphabet/y.png"}, {"audio": 0, "start": 309092, "crunched": 0, "end": 309226, "filename": "/images/alphabet/c.png"}, {"audio": 0, "start": 309226, "crunched": 0, "end": 309357, "filename": "/images/alphabet/4.png"}], "remote_package_size": 309357, "package_uuid": "10155ffa-b8d2-490e-9bb3-d51f7989f5a1"});

})();
