var MyPromise = (() => {
    // 私有方法
    function _resolved(data) {
        setTimeout(() => {
            if (this.state === "pending") {
                this.state = "resolved";
                this.data = data;
                this._resolvedArr.forEach((fn) => fn());
            }
        }, 0);
    }

    function _rejected(err) {
        setTimeout(() => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.data = err;
                this._rejectedArr.forEach((fn) => fn());
            }
        });
    }

    return class {
        constructor(fn) {
            if (typeof fn !== "function") {
                throw Error(`Promise resolver ${fn} is not a funtion`);
            }
            this.state = "pending";
            this.data = null;
            this._resolvedArr = [];
            this._rejectedArr = [];
            fn(_resolved.bind(this), _rejected.bind(this));
        }

        then(onResolved, onRejected) {
            return new MyPromise((resolved, rejected) => {
                if (this.state === "pending") {
                    this._resolvedArr.push(
                        ((onResolved) => {
                            return () => {
                                var res = onResolved(this.data);
                                if (res instanceof MyPromise) {
                                    res.then(resolved, rejected);
                                } else {
                                    resolved(res);
                                }
                            };
                        })(onResolved)
                    );
                    this._rejectedArr.push(
                        ((onRejected) => {
                            return () => {
                                var res = onRejected(this.data);
                                if (res instanceof MyPromise) {
                                    res.then(resolved, rejected);
                                } else {
                                    resolved(res);
                                }
                            };
                        })(onRejected)
                    );
                } else {
                    var res =
                        this.state === "resolved"
                            ? onResolved(this.data)
                            : onRejected(this.data);
                    if (res instanceof MyPromise) {
                        res.then(resolved, rejected);
                    } else {
                        resolved(res);
                    }
                }
            });
        }
    };
})();

const PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED';


class MyPromise {
    constructor(executor) {
        if (typeof executor !== "function") {
            throw Error(`Promise resolver ${executor} is not a funtion`);
        }
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
    }
}