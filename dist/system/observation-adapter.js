System.register(["./property-observation"], function (_export) {
  "use strict";

  var BreezeObjectObserver, BreezePropertyObserver, _prototypeProperties, _classCallCheck, BreezeObservationAdapter;


  function createObserverLookup(obj) {
    var value = new BreezeObjectObserver(obj);

    Object.defineProperty(obj, "__breezeObserver__", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });

    return value;
  }

  function createCanObserveLookup(entityType) {
    var value = {},
        properties = entityType.getProperties(),
        property,
        ii = properties.length,
        i;

    for (i = 0; i < ii; i++) {
      property = properties[i];

      value[property.name] = property.isDataProperty || property.isScalar;
    }

    Object.defineProperty(entityType, "__canObserve__", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });

    return value;
  }

  return {
    setters: [function (_propertyObservation) {
      BreezeObjectObserver = _propertyObservation.BreezeObjectObserver;
      BreezePropertyObserver = _propertyObservation.BreezePropertyObserver;
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      BreezeObservationAdapter = _export("BreezeObservationAdapter", (function () {
        function BreezeObservationAdapter() {
          _classCallCheck(this, BreezeObservationAdapter);
        }

        _prototypeProperties(BreezeObservationAdapter, null, {
          handlesProperty: {
            value: function handlesProperty(object, propertyName) {
              var entityType, canObserve;

              if (!object.entityAspect || !(entityType = object.entityType)) {
                return false;
              }
              canObserve = entityType.__canObserve__ || createCanObserveLookup(entityType);

              return !!canObserve[propertyName];
            },
            writable: true,
            configurable: true
          },
          getObserver: {
            value: function getObserver(object, propertyName) {
              var observerLookup;

              if (!this.handlesProperty(object, propertyName)) throw new Error("BreezeBindingAdapter does not support observing the " + propertyName + " property.  Check the handlesProperty method before calling createObserver.");

              observerLookup = object.__breezeObserver__ || createObserverLookup(object);
              return observerLookup.getObserver(propertyName);
            },
            writable: true,
            configurable: true
          }
        });

        return BreezeObservationAdapter;
      })());
    }
  };
});