/**
 * Created by kuroky360 on 16-1-25.
 */
!function(window,document,undefined){
    // initial variable
    var angular=window.angular||{},
        angularModule,
        toString=Object.prototype.toString,
        slice=[].slice,
        splice=[].splice,
        isArray=Array.isArray,
        msie,
        jQuery,
        jqLite,
        uid= 0,
        hasOwnProperty=Object.prototype.hasOwnProperty,
        getPrototypeOf=Object.getPrototypeOf,
        version={
            full:'0.0.1',
            major:0,
            minor:0,
            dot:1,
            codeName:'DIY angularjs'
        };

    msie = document.documentMode;

    var NODE_TYPE_ELEMENT=1;
    var NODE_TYPE_ATTRITUBE=2;
    var NODE_TYPE_TEXT=3;
    var NODE_TYPE_DOCUMENT=9;
    var NODE_TYPE_DOCUMENT_FRAGMENT=11;

    // minErr
    function minErr(module,errorConstructor){
        //todo
    }
    // shadow & deep
    function copy(){
        // todo
    }
    // returns a function which calls function `fn` bound to self.
    function bind(self, fn) {
        var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
        if (isFunciton(fn)) {
            return curryArgs.length
                ? function () {
                    return arguments.length
                          ? fn.apply(self, concat(curryArgs, arguments, 0))
                          : fn.apply(self, curryArgs);
                  }
                : function () {
                    return arguments.length
                           ? fn.apply(self, arguments)
                           : fn.call(self);

                  }
        } else {
            return fn;
        }
    }

    //shallow copy fn typically Array or Object
    function shallowCopy(src,dst){
        if(isArray(src)){
            dst = dst || [];
            for(var i= 0,ii=src.length;i<ii;i++){
                dst[i]=src[i];
            }
        }else if(isObject(src)){
            dst = dst||{};
            for(var key in src){
                if(!(key.charAt(0)==='$'&&key.charAt(1)==='$$')){//except $ $$ prefix for angular.
                    dst[key]=src[key];
                }
            }
        }

        return dst||src;
    }


    // a reference is DOM element or wrapped jQuery Element
    function isElement(node){
        return !!(node&&
            (node.nodeName|| //direct element
                (node.attr&&node.prop&&node.find)
            )
        )
    }

    // nodeName_ lowercase
    function nodeName_(element){
        return lowercase(element.nodeName||(element[0]&&element[0].nodeName));
    }

    // shadow & deep
    function baseExtend(dst,objs,deep){
        var i, ii,j,jj,obj,src,keys,key;
        for(i=0,ii=objs.length;i<ii;i++){
            obj=objs[i];
            if(!isObject(obj)&&!isFunciton(obj)) continue;
            keys = Object.keys(obj);
            for(j=0,jj=keys.length;j<jj;j++){
                key=keys[j];
                src=obj[key];
                if(deep&&isObject(src)){
                    if(isDate(src)){
                        dst[key]=new Date(src.valueOf());
                    }else if(isRegExp(src)){
                        dst[key]=new RegExp(src);
                    }else if(src.nodeName){
                        dst[key]=src.cloneNode(true);
                    }else if(isElement(src)){
                        dst[key]=src.clone();
                    }else{
                        if(!isObject(dst[key])) dst[key]=isArray(dst[key])?[]:{};
                        dst[key]=baseExtend(dst[key],[src],true);
                    }

                }else{//primitive value string number boolean...
                    dst[key]=src;
                }
            }
        }
        return dst;
    }

    function shallowExtend(dst){
        return baseExtend(dst,slice.call(arguments,1),false);
    }
    // deep merge
    function deepExtend(dst){
        return baseExtend(dst,slice.call(arguments,1),true);
    }
    // inherit
    function inherit(parent,extra){
        return shallowExtend(Object.create(parent),extra);
    }

    ////////////////////////////////////
    // Error handler todo
    ////////////////////////////////////

    ////////////////////////////////////
    // Event handler todo
    ////////////////////////////////////


    ////////////////////////////////////
    // Http $q promise todo
    ////////////////////////////////////

    function $HttpProvider(){
        //todo
    }

    ////////////////////////////////////
    // dom selectors fn todo
    ////////////////////////////////////

    function jqLite(){
        this.length=0;
    }

    jqLite.prototype={
      //todo
    };
    ////////////////////////////////////
    // fn utils
    ////////////////////////////////////
    function isFunciton(value){return typeof value ==='function';}

    function noop(){}

    function isUndefined(value){return typeof value ==='undefined';}

    function isDefined(value){return typeof value !=='undefined';}

    function isString(value){return typeof value==='string';}

    function isObject(value){return value!==null&&typeof value==='object'}

    function isNumber(value){return typeof value === 'number'}

    function isDate(value){ toString.call(value)==='[object Date]'}

    // isWindow
    function isWindow(obj){
        return obj&&obj.window===window;
    }

    //isFile
    function isFile(obj){
        return toString.call(obj)==='[object File]';
    }

    //isFormData
    function isFormData(obj){
        return toString.call(obj)==='[object FormData]';
    }

    //isBlob
    function isBlob(obj){
        return toString.call(obj)==='[object Blob]';
    }

    //isBoolean
    function isBoolean(obj){
        return typeof obj ==='boolean';
    }

    //isPromiseLike
    function isPromiseLike(obj){
        return obj&&isFunciton(obj.then);
    }


    function lowercase(value){return isString(value)?value.toLowerCase():value}

    function uppercase(value){return isString(value)?value.toUpperCase():value}

    function fromJson(value){
        return isString(value)?JSON.parse(value):value;
    }

    function identity($){return $;}

    //toJson
    function toJson(obj,pretty){
        if(isUndefined(obj)) return undefined;
        if(!isNumber(pretty)){
            pretty= pretty?2:null;
        }
        return JSON.stringify(obj,toJsonReplacer,pretty);
    }
    //toJsonReplacer
    function toJsonReplacer(key,value){
        var val=value;
        if(isString(key)&&key.charAt(0)==='$'&&key.charAt(1)==='$'){//$$ no stringify
            val=undefined;
        }else if(isWindow(val)){
            val='$WINDOW';
        }else if(isScope(val)){
            val='$SCOPE';
        }else if(val&&val===document){
            val='$DOCUMENT';
        }

        return val;
    }

    function valueFn(value){
        return function(){
            return value;
        }
    }

    function toInt(value){
        return parseInt(value,10);
    }

    function forEachSorted(obj,iterator,context){
        var keys=Object.keys(obj).sort();
        for(var i= 0;i<keys.length;i++){
            iterator.call(context,obj[keys[i]],keys[i]);
        }
        return keys;
    }

    //function isArray(value){ return Array.isArray(value);}

    // check RegExp
    function isRegExp(value){ return toString.call(value)==='[object RegExp]';}

    //reverse params
    function reverseParams(iteratorFn){
        return function(value,key){
            iteratorFn(key,value);
        };
    }

    // check blankObject -->with a null prototype
    function isBlankObject(value){
        return value!==null&&typeof value==='object'&& !getPrototypeOf(value);
    }

    // check window
    function isWindow(obj){
        return obj&&obj.window===obj;
    }

    // isScope
    function isScope(obj){
        return obj&&obj.$evalAsync&&obj.$watch;
    }
    // is ArrayLike NodeList arguments jqLite string
    function isArrayLike(obj){
        if(obj===null||isWindow(obj)) return false;
        if(isArray(obj)||isString(obj)||jqLite&&obj instanceof jqLite) return true;
        var length = 'length' in Object(obj)&&obj.length;
        return isNumber(length) && (length >=0 && (length-1) in obj ||typeof  obj.item ==='function');
    }

    // trim fn
    var trim = function(value){
        return isString(value)?value.trim():value;
    };

    // customToString
    function hasCustomToString(obj){
        return isFunciton(obj.toString)&&obj.toString!==toString;
    }

    //sliceArgs
    function sliceArgs(args,startIndex){
        return slice.call(args,startIndex||0);
    }

    // concat
    function concat(array1,array2,index){
        return array1.concat(slice.call(array2,index));
    }

    function nextUid(){
        return ++uid;
    }

    //includes
    function includes(array,obj){
        return Array.prototype.indexOf.call(array,obj)!== -1;
    }

    // array remove
    function arrayRemove(array,value){
        var index = array.indexOf(value);
        if(index>=0){
            array.splice(index,1);
        }
        return index;
    }

    //forEach fn
    function forEach(obj,iterator,context){
        var key,
            length;
        if(obj){
            if(isFunciton(obj)){
                for(key in obj){
                    if('length'!==key&&'prototype'!==key&&'name'!==key&&(!obj.hasOwnProperty||obj.hasOwnProperty(key))){
                        iterator.call(context,obj[key],key,obj);
                    }
                }
            }else if(isArray(obj)||isArrayLike(obj)){
                var isPrimitive = typeof obj!=='object';
                for(key=0,length=obj.length;key<length;key++){
                    if(isPrimitive||key in obj)
                    iterator.call(context,obj[key],key,obj);
                }
            }else if(obj.forEach&&obj.forEach!==forEach){
                obj.forEach(iterator,context,obj);
            }else if(isBlankObject(obj)){
                for(key in obj){ //no inheritance :fast path
                    iterator.call(context,obj[key],key,obj);
                }
            }else if(typeof obj.hasOwnProperty!=='function'){//maybe no hasOwnProperty method
                for(key in obj){
                    if(hasOwnProperty.call(obj,key)){
                        iterator.call(context,obj[key],key,obj);
                    }
                }
            }else{
                for(key in obj){
                    if(obj.hasOwnProperty(key)){
                        iterator.call(context,obj[key],key,obj);
                    }
                }
            }
        }
        return obj;
    }

    // Creates a new object without a prototype.
    function createMap(){
        return Object.create(null);
    }

    /**
     * makeMap
     * @param str 'key1,key2,...'
     * @returns {object} in the form of {key1:true,key2:true,...}
     */
    function makeMap(str){
        var obj={},items=str.split(','), i,j;
        for(i=0,j=items.length;i<j;i++){
            obj[items[i]]=true;
        }
        return obj;
    }

    // module loader setup
    function setupModuleLoader(window) {

        function ensure(obj, child, factory) {
            return obj[child] || (obj[child] = factory());
        }

        var angular = ensure(window, angular, Object);

        return ensure(angular, 'module', function () {
            var modules = {};

            return function module(name, requires, configFn) {
                if (requires && modules.hasOwnProperty(name)) {
                    modules[name] = null;
                }
                return ensure(modules, name, function () {
                    var invokeQueue=[];
                    var configBlocks=[];
                    var runBlocks=[];
                    var config=invokeLater('$injector','invoke','push',configBlocks);
                    var moduleInstance={
                        _invokeQueue:invokeQueue,
                        _configBlocks:configBlocks,
                        _runBlocks:runBlocks,
                        requires:requires,
                        name:name,
                        config:config,
                        provider:invokeLaterAndSetModuleName('$provide','provider'),
                        factory:invokeLaterAndSetModuleName('$provide','factory'),
                        service:invokeLaterAndSetModuleName('$provide','service'),
                        constant:invokeLater('$provide','constant','unshift'),
                        value:invokeLater('$provide','value'),
                        controller:invokeLaterAndSetModuleName('$controllerProvider','register'),
                        filter:invokeLaterAndSetModuleName('$filterProvider','register'),
                        directive:invokeLaterAndSetModuleName('$compileProvider','directive'),
                        component:invokeLaterAndSetModuleName('$compileProvider','register')
                    };
                    if(configFn){
                        config(configFn);
                    }

                    function invokeLater(provider,method,insertMethod,queue){
                        if(!queue) queue=invokeQueue;
                        return function(){
                            queue[insertMethod||'push']([provider,method,arguments]);
                            return moduleInstance;
                        }
                    }

                    function invokeLaterAndSetModuleName(provider,method){
                        return function(recipeName,factoryFn){
                            if(factoryFn&&isFunciton(factoryFn)) factoryFn.$$moduleName=name;
                            invokeQueue.push([provider,method,arguments]);
                            return moduleInstance;
                        };
                    }
                });
            };
        });
    }

    //bootstrap fn
    function bootstrap(element,modules,config){
        var modules=modules||[],
            instanceInjector;

        var defaultConfig={
            strictDi:false
        };
        config=shallowExtend(defaultConfig,config);
        modules.unshift('ng');
        modules.push(['$provide',function($provide){
            $provide.value('$rootElement',element);
        }]);

        instanceInjector = createInjector(modules,config.strictDi);
    }

    // annotate fn
    function annotate(fn){
        var $injectArray=[];
        return $injectArray;
    }

    //injector creator
    function createInjector(modulesToLoad,strictDi){
        strictDi = (strictDi === true);
        var providerSufix='Provider',
            INSTANTING={},
            path=[],
            providerCache={
                $provide:{
                    provider:supportObject(provider),
                    factory:supportObject(factory),
                    service:supportObject(service),
                    value:supportObject(value)
                }
            },
            providerInjector=(providerCache.$injector=createInternalInjector(providerCache,function(seviceName,caller){
                throw new Error('can not found provider!');
            })),
            instanceCache={},
            protoInstanceInjector=createInternalInjector(instanceCache,function(serviceName,caller){
                var provider = providerInjector.get(serviceName+providerSufix,caller);
                instanceCache.invoke(provider.$get,provider,undefined,serviceName);
            }),
            instanceInjector=protoInstanceInjector;
        providerCache['$injector'+providerSufix]={$get:valueFn(protoInstanceInjector)};
        var runBlocks=loadMoules(modulesToLoad);
        instanceInjector=protoInstanceInjector.get('$injector');
        instanceInjector.strictDi=strictDi;
        //forEach load modules
        forEach(runBlocks,function(fn){if(fn) instanceInjector.invoke(fn);});

        return instanceInjector;

        ////////////////////////////////////
        // Module Loading
        ////////////////////////////////////
        function loadMoules(modules){
            var runBlocks=[],moduleFn;
            forEach(modules,function(module){
                function runInvokeQueue(queue){
                    var i,ii,invokeArgs,provider;
                    for(i= 0,ii=queue.length;i<ii;i++){
                        invokeArgs=queue[i];
                        provider=providerInjector.get(invokeArgs[0]);
                        provider[invokeArgs[1]].apply(provider,invokeArgs[3]);
                    }
                }

                if(isString(module)){
                    moduleFn=angularModule(module);// get module
                    runBlocks.concat(loadMoules(moduleFn.requires)).concat(moduleFn._runBlocks);
                    runInvokeQueue(moduleFn._invokeQueue);
                    runInvokeQueue(moduleFn._configBlocks)
                }else if(isArray(module)){
                    runBlocks.push(providerInjector.invoke(module));
                }else if(isFunciton(module)){
                    runBlocks.push(providerInjector.invoke(module));
                }else{
                    // todo
                }
            });

            return runBlocks;
        }

        //support object arg
        function supportObject(delegate){
            return function(key,value){
                if(isObject(key)){
                    forEach(key,reverseParams(delegate))
                }else{
                    return delegate(key,value);
                }
            }
        }
        //provider
        function provider(name,provider_){
            if(isFunciton(provider_)||isArray(provider_)){
                provider_ = providerInjector.instantiate(provider_);
            }
            if(!provider_.$get){
                throw new Error('do not have $get method!');
            }
            return  providerCache[name+providerSufix]=provider_;
        }

        function enForceReturnValue(factoryFn){
            return function(){
                var result=instanceCache.invoke(factoryFn);
                return result;
            };
        }

        //facotry
        function factory(name,factoryFn,enForce){
            return provider(name,{
                $get:enForce===false?enForceReturnValue(factoryFn):factoryFn
            });
        }

        //service
        function service(name,contructor){
            return factory(name,['$injector',function($injector){
                return $injector.instantiate(contructor);
            }]);
        }

        //value
        function value(name,value){
            return factory(name,valueFn(value),false);
        }


        ////////////////////////////////////
        // internal injector
        ////////////////////////////////////
        function createInternalInjector(cache,factory){

            // get service
            function getService(serviceName,caller){
                if(cache.hasOwnProperty(serviceName)){
                    if(cache[serviceName]===INSTANTING){
                        throw new Error('重复循环依赖！');
                    }
                    return cache[serviceName];
                }else{
                    cache[serviceName]=INSTANTING;
                    //path.push(serviceName);
                    return  cache[serviceName]=factory(serviceName,caller);
                }
            }

            //invoke fn
            function invoke(fn,self,locals,serviceName){
                var length,
                    args=[],
                    i,
                    item,
                    annotateArray=annotate(fn);
                for(i=0,length=annotateArray.length;i<length;i++){
                    item=annotateArray[i];
                    args.push(locals&&locals.hasOwnProperty(item)?locals[item]:getService(item,serviceName));
                }

                if(isArray(fn)){
                    fn=fn[fn.length-1];
                }

                return fn.call(self,args);
            }

            // intantiate instace
            function instantiate(type,locals,serviceName){
                var instance = Object.create((isArray(type)? type[type.length-1]:type).prototype||null);
                var returnValue = invoke(type,instance,locals,serviceName);

                return isObject(returnValue)|| isFunciton(returnValue)?returnValue:instance;
            }

            return {
                instantiate:instantiate,
                invoke:invoke,
                get:getService
            };
        }
    }

    // expose angular
    function publishExternalAPI(angular){
        shallowExtend(angular,{
            noop:noop,
            version:version,
            isFunction:isFunciton,
            isArray:isArray,
            isNumber:isNumber,
            isDefined:isDefined,
            isUndefined:isUndefined,
            isString:isString,
            isBlankObject:isBlankObject,
            isRegExp:isRegExp,
            isDate:isDate,
            isObject:isObject,
            isElement:isElement,
            identity:identity,
            fromJson:fromJson,
            toJson:toJson,
            copy:copy,
            shallowExtend:shallowExtend,
            deepExtend:deepExtend,
            bootstrap:bootstrap,
            createInjector:createInjector,
            forEach:forEach,
            lowercase:lowercase,
            uppercase:uppercase
        });
        angularModule=setupModuleLoader(window);
        angularModule('ng',['ngLocale'],['$provide',function($provide){
           //todo
            $provide.provider({$$sanitizeUri:$$SanitizeUriProvider});
            $provide.provider('$compile',$CompileProvider).directive({});//lots of directives
            $provide.provider({
                $http:$HttpProvider,
                $q:$QProvider,
                $log:$LogProvider,
                $rootScope:$RootScopeProvider,
                $document:$DocumentProvider,
                $parse:$ParseProvider,
                $controller:$ControllerProvider,
                $window:$WindowProvider,
                $timeout:$TimeoutProvider,
                $filter:$FilterProvider,
                $browser:$BrowserProvider,
                $templateCache:$TemplateCacheProvider,
                $templateRequest:$TemplateRequestProvider,
                $xhrFactory:$xhrFactoryProvider,
                $exceptionHandler:$ExceptionHandlerProvider,
                $httpBackend:$HttpBackendProvider,
                $snifferProvider:$SnifferProvider
            });//lots of providers
        }]);
    }
    //compileProvider
    function $CompileProvider(){
        this.directive=function(){};
    }

    function $SnifferProvider(){
        // todo
    }

    //Browser constructor
    function Browser(window,document,$log,$sniffer){
        // todo
    }

    //q factory fn
    function qFactory(nextTick,exceptionHandler){

        function Promise(){
            this.$$state={status:0};
        }

        shallowExtend(Promise.prototype,{
            then:function(onFulfilled,onRejected,progressBack){
                if(isUndefined(onFulfilled)&&isUndefined(onRejected)&&isUndefined(progressBack)){
                    return this;
                }
                var result=new Deferred();
                this.$$state.pending=this.$$state.pending||[];
                this.$$state.pending.push([result,onFulfilled,onRejected,progressBack]);
                if(this.$$state.status>0) scheduleProcessQueue(this.$$state);
                return result.promise;
            },
            'catch':function(callback){
                return this.then(null,callback);
            },
            'finally':function(callback,progressBack){
                return this.then(function(value){
                    return handleCallback(value,true,callback);
                },function(error){
                    return handleCallback(error,false,callback);
                },progressBack);
            }
        });

        function processQueue(state){
            var fn,pending,deferred,i,ii;
            pending=state.pending;
            state.pending=undefined;
            state.processScheduled=false;
            for(i=0,ii=pending.length;i<ii;i++){
                deferred=pending[i][0];
                fn=pending[i][state.status];
                if(isFunciton(fn)){
                    deferred.resolve(fn(state.value));
                }else if(state.status===1){
                    deferred.resolve(state.value);
                }else {
                    deferred.reject(state.value);
                }
            }
        }

        function scheduleProcessQueue(state){
            if(state.processScheduled||!state.pending) return;
            state.processScheduled=true;
            nextTick(function(){processQueue(state);})
        }

        function Deferred(){
            this.promise=new Promise();
        }

        shallowExtend(Deferred.prototype,{
            resolve:function(val){
                if(this.promise.$$state.status) return;
                if(this.promise===val){
                    throw new Error('should be resolved with value other than itself.');
                }else {
                    this.$$resolve(val);
                }

            },
            $$resolve:function(val){
                var that=this,
                    done=false,
                    then;
                if(isObject(val)||isFunciton(val)) then=val&&val.then;
                if(isFunciton(then)){
                    this.promise.$$state.status=-1;
                    then.call(val,resolvePromise,rejectPromise,simpleBind(this,this.notify));
                }else{
                    this.promise.$$state.value=val;
                    this.promise.$$state.status=1;
                    scheduleProcessQueue(this.promise.$$state);
                }

                function resolvePromise(value){
                    if(done) return;
                    done=true;
                    that.$$resolve(value);
                }

                function rejectPromise(reason){
                    if(done) return;
                    done=true;
                    that.$$reject(reason);
                }

            },
            reject:function(reason){
                if(this.promise.$$state.status) return;
                this.$$reject(reason);
            },
            $$reject:function(reason){
                this.promise.$$state.value=reason;
                this.promise.$$state.status=2;
                scheduleProcessQueue(this.promise.$$state);
            },
            notify:function(){
                //todo
            }

        });

        function simpleBind(context,fn){
            return function(value){
                return fn.call(context,value);
            };
        }

        var reject=function(reason){
            var result=new Deferred();
            result.reject(reason);
            return result.promise;
        };

        var makePromise= function (value,isResolved) {
            var result=new Deferred();
            if(isResolved){
                result.resolve(value);
            }else{
                result.reject(value);
            }
            return result.promise;
        };

        var handleCallback=function(value,isResolved,callback){
            var callbackOutput;
            if(isFunciton(callback)) callbackOutput=callback();
            if(isPromiseLike(callbackOutput)){
                return callbackOutput.then(function(){
                    return makePromise(value,isResolved);
                },function(error){
                    return makePromise(error,false);
                });
            }else{
                return makePromise(value,isResolved);
            }
        };

        // wrap value into $q promise.
        var when=function(value,callback,errback,processBack){
            var result = new Deferred();
            result.resolve(value);
            return result.promise.then(callback,errback,processBack);
        };

        // to maintain naming consistency.
        var resolve=when;

        var $Q=function Q(resolver){
            if(!isFunciton(resolver)){
                throw new Error('expected resolverFn');
            }
            var deferred=new Deferred();
            function resolveFn(value){
                deferred.resolve(value);
            }
            function rejectFn(reason){
                deferred.reject(reason);
            }
            resolver(resolveFn,rejectFn);
            return deferred.promise;
        };

        var defer = function(){
            var d=new Deferred();
            // necessary to support unbound excution.
            d.resolve=simpleBind(d,d.resolve);
            d.reject=simpleBind(d,d.reject);
            d.notify=simpleBind(d,d.notify);
            return d;
        };

        // combines multiple promises into a single promise that is resolved when all of the input promises are resolved.
        function all(promises){
            var deferred=new Deferred(),
                counter= 0,
                results=isArray(promises)?[]:{};

            forEach(promises,function(promise,key){
                counter++;
                when(promise).then(function (value) {
                    if(results.hasOwnProperty(key)) return;
                    results[key]=value;
                    if(!(--counter)) deferred.resolve(results);
                }, function (reason) {
                    if(results.hasOwnProperty(key)) return;
                    deferred.reject(reason);
                });
            });

            if(counter===0){
                deferred.resolve(results);
            }

            return deferred.promise;
        }

        // make the instanceof operator work for promises.
        $Q.prototype=Promise.prototype;

        $Q.reject=reject;
        $Q.defer=defer;
        $Q.when=when;
        $Q.resolve=resolve;
        $Q.all=all;

        return $Q;
    }
    // qprovider
    function $QProvider(){
        this.get = ['$rootScope','$exceptionHandler',function($rootScope,$exceptionHandler){
            return qFactory(function(callback){
                $rootScope.$evalAsync(callback);
            },$exceptionHandler)
        }];
    }

    function $HttpBackendProvider(){
        //todo
    }

    function $ExceptionHandlerProvider(){
        //todo
    }

    function $xhrFactoryProvider(){
        //todo
    }

    // timeout
    function $TimeoutProvider(){
        // todo
    }
    // logProvider
    function $LogProvider(){
        //todo
    }

    function $RootScopeProvider(){
        // todo
    }

    // documentProvider
    function $DocumentProvider(){
        this.$get=['$window',function(window){
            return jqLite(window.document);
        }];
    }

    function $ParseProvider(){
        // todo
    }

    function $ControllerProvider(){

        this.register=function(){

        };
        this.component= function () {

        };
    }

    function $WindowProvider(){
        this.$get=valueFn(window);
    }

    function $FilterProvider(){
        // todo
    }

    // browser provider
    function $BrowserProvider(){
        this.$get=['$window','$log','$document','$sniffer',function($window,$log,$document,$sniffer){
            return new Browser($window,$document,$log,$sniffer);
        }];
    }

    function $TemplateCacheProvider(){
        // todo
    }

    function $TemplateRequestProvider(){

    }

    function $$SanitizeUriProvider(){
        // todo
    }
    //first check jquery

    //publish angular

    //bootstrap when dom ready

}(window,document);



