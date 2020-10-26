define("algorithmx-jupyter", ["@jupyter-widgets/base"], function (t) {
  return (function (t) {
    var n = {};
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { i: r, l: !1, exports: {} });
      return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
    }
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r });
      }),
      (e.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (e.t = function (t, n) {
        if ((1 & n && (t = e(t)), 8 & n)) return t;
        if (4 & n && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (e.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & n && "string" != typeof t)
        )
          for (var i in t)
            e.d(
              r,
              i,
              function (n) {
                return t[n];
              }.bind(null, i)
            );
        return r;
      }),
      (e.n = function (t) {
        var n =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(n, "a", n), n;
      }),
      (e.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (e.p = ""),
      e((e.s = 14))
    );
  })([
    function (t, n, e) {
      "use strict";
      function r(t) {
        for (var e in t) n.hasOwnProperty(e) || (n[e] = t[e]);
      }
      Object.defineProperty(n, "__esModule", { value: !0 }),
        r(e(19)),
        r(e(20)),
        r(e(5)),
        r(e(11)),
        r(e(13)),
        r(e(12)),
        r(e(1)),
        r(e(23)),
        r(e(4)),
        r(e(8)),
        r(e(10)),
        r(e(9)),
        r(e(2)),
        r(e(3)),
        r(e(6)),
        r(e(24));
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r,
        i = e(8),
        o = e(4),
        s = e(5),
        u = e(2),
        a = e(3),
        c = e(11),
        h = e(12);
      function l(t) {
        return void 0 !== t.leaves || void 0 !== t.groups;
      }
      !(function (t) {
        (t[(t.start = 0)] = "start"),
          (t[(t.tick = 1)] = "tick"),
          (t[(t.end = 2)] = "end");
      })((r = n.EventType || (n.EventType = {})));
      var f = (function () {
        function t() {
          var n = this;
          (this._canvasSize = [1, 1]),
            (this._linkDistance = 20),
            (this._defaultNodeSize = 10),
            (this._linkLengthCalculator = null),
            (this._linkType = null),
            (this._avoidOverlaps = !1),
            (this._handleDisconnected = !0),
            (this._running = !1),
            (this._nodes = []),
            (this._groups = []),
            (this._rootGroup = null),
            (this._links = []),
            (this._constraints = []),
            (this._distanceMatrix = null),
            (this._descent = null),
            (this._directedLinkConstraints = null),
            (this._threshold = 0.01),
            (this._visibilityGraph = null),
            (this._groupCompactness = 1e-6),
            (this.event = null),
            (this.linkAccessor = {
              getSourceIndex: t.getSourceIndex,
              getTargetIndex: t.getTargetIndex,
              setLength: t.setLinkLength,
              getType: function (t) {
                return "function" == typeof n._linkType ? n._linkType(t) : 0;
              },
            });
        }
        return (
          (t.prototype.on = function (t, n) {
            return (
              this.event || (this.event = {}),
              "string" == typeof t
                ? (this.event[r[t]] = n)
                : (this.event[t] = n),
              this
            );
          }),
          (t.prototype.trigger = function (t) {
            this.event &&
              void 0 !== this.event[t.type] &&
              this.event[t.type](t);
          }),
          (t.prototype.kick = function () {
            for (; !this.tick(); );
          }),
          (t.prototype.tick = function () {
            if (this._alpha < this._threshold)
              return (
                (this._running = !1),
                this.trigger({
                  type: r.end,
                  alpha: (this._alpha = 0),
                  stress: this._lastStress,
                }),
                !0
              );
            var t,
              n,
              e = this._nodes.length;
            this._links.length;
            for (this._descent.locks.clear(), n = 0; n < e; ++n)
              if ((t = this._nodes[n]).fixed) {
                (void 0 !== t.px && void 0 !== t.py) ||
                  ((t.px = t.x), (t.py = t.y));
                var i = [t.px, t.py];
                this._descent.locks.add(n, i);
              }
            var o = this._descent.rungeKutta();
            return (
              0 === o
                ? (this._alpha = 0)
                : void 0 !== this._lastStress && (this._alpha = o),
              (this._lastStress = o),
              this.updateNodePositions(),
              this.trigger({
                type: r.tick,
                alpha: this._alpha,
                stress: this._lastStress,
              }),
              !1
            );
          }),
          (t.prototype.updateNodePositions = function () {
            for (
              var t,
                n = this._descent.x[0],
                e = this._descent.x[1],
                r = this._nodes.length;
              r--;

            )
              ((t = this._nodes[r]).x = n[r]), (t.y = e[r]);
          }),
          (t.prototype.nodes = function (t) {
            if (!t) {
              if (0 === this._nodes.length && this._links.length > 0) {
                var n = 0;
                this._links.forEach(function (t) {
                  n = Math.max(n, t.source, t.target);
                }),
                  (this._nodes = new Array(++n));
                for (var e = 0; e < n; ++e) this._nodes[e] = {};
              }
              return this._nodes;
            }
            return (this._nodes = t), this;
          }),
          (t.prototype.groups = function (t) {
            var n = this;
            return t
              ? ((this._groups = t),
                (this._rootGroup = {}),
                this._groups.forEach(function (t) {
                  void 0 === t.padding && (t.padding = 1),
                    void 0 !== t.leaves &&
                      t.leaves.forEach(function (e, r) {
                        "number" == typeof e &&
                          ((t.leaves[r] = n._nodes[e]).parent = t);
                      }),
                    void 0 !== t.groups &&
                      t.groups.forEach(function (e, r) {
                        "number" == typeof e &&
                          ((t.groups[r] = n._groups[e]).parent = t);
                      });
                }),
                (this._rootGroup.leaves = this._nodes.filter(function (t) {
                  return void 0 === t.parent;
                })),
                (this._rootGroup.groups = this._groups.filter(function (t) {
                  return void 0 === t.parent;
                })),
                this)
              : this._groups;
          }),
          (t.prototype.powerGraphGroups = function (t) {
            var n = i.getGroups(
              this._nodes,
              this._links,
              this.linkAccessor,
              this._rootGroup
            );
            return this.groups(n.groups), t(n), this;
          }),
          (t.prototype.avoidOverlaps = function (t) {
            return arguments.length
              ? ((this._avoidOverlaps = t), this)
              : this._avoidOverlaps;
          }),
          (t.prototype.handleDisconnected = function (t) {
            return arguments.length
              ? ((this._handleDisconnected = t), this)
              : this._handleDisconnected;
          }),
          (t.prototype.flowLayout = function (t, n) {
            return (
              arguments.length || (t = "y"),
              (this._directedLinkConstraints = {
                axis: t,
                getMinSeparation:
                  "number" == typeof n
                    ? function () {
                        return n;
                      }
                    : n,
              }),
              this
            );
          }),
          (t.prototype.links = function (t) {
            return arguments.length ? ((this._links = t), this) : this._links;
          }),
          (t.prototype.constraints = function (t) {
            return arguments.length
              ? ((this._constraints = t), this)
              : this._constraints;
          }),
          (t.prototype.distanceMatrix = function (t) {
            return arguments.length
              ? ((this._distanceMatrix = t), this)
              : this._distanceMatrix;
          }),
          (t.prototype.size = function (t) {
            return t ? ((this._canvasSize = t), this) : this._canvasSize;
          }),
          (t.prototype.defaultNodeSize = function (t) {
            return t
              ? ((this._defaultNodeSize = t), this)
              : this._defaultNodeSize;
          }),
          (t.prototype.groupCompactness = function (t) {
            return t
              ? ((this._groupCompactness = t), this)
              : this._groupCompactness;
          }),
          (t.prototype.linkDistance = function (t) {
            return t
              ? ((this._linkDistance = "function" == typeof t ? t : +t),
                (this._linkLengthCalculator = null),
                this)
              : this._linkDistance;
          }),
          (t.prototype.linkType = function (t) {
            return (this._linkType = t), this;
          }),
          (t.prototype.convergenceThreshold = function (t) {
            return t
              ? ((this._threshold = "function" == typeof t ? t : +t), this)
              : this._threshold;
          }),
          (t.prototype.alpha = function (t) {
            return arguments.length
              ? ((t = +t),
                this._alpha
                  ? (this._alpha = t > 0 ? t : 0)
                  : t > 0 &&
                    (this._running ||
                      ((this._running = !0),
                      this.trigger({ type: r.start, alpha: (this._alpha = t) }),
                      this.kick())),
                this)
              : this._alpha;
          }),
          (t.prototype.getLinkLength = function (t) {
            return "function" == typeof this._linkDistance
              ? +this._linkDistance(t)
              : this._linkDistance;
          }),
          (t.setLinkLength = function (t, n) {
            t.length = n;
          }),
          (t.prototype.getLinkType = function (t) {
            return "function" == typeof this._linkType ? this._linkType(t) : 0;
          }),
          (t.prototype.symmetricDiffLinkLengths = function (t, n) {
            var e = this;
            return (
              void 0 === n && (n = 1),
              this.linkDistance(function (n) {
                return t * n.length;
              }),
              (this._linkLengthCalculator = function () {
                return o.symmetricDiffLinkLengths(e._links, e.linkAccessor, n);
              }),
              this
            );
          }),
          (t.prototype.jaccardLinkLengths = function (t, n) {
            var e = this;
            return (
              void 0 === n && (n = 1),
              this.linkDistance(function (n) {
                return t * n.length;
              }),
              (this._linkLengthCalculator = function () {
                return o.jaccardLinkLengths(e._links, e.linkAccessor, n);
              }),
              this
            );
          }),
          (t.prototype.start = function (n, e, r, i, c) {
            var h = this;
            void 0 === n && (n = 0),
              void 0 === e && (e = 0),
              void 0 === r && (r = 0),
              void 0 === i && (i = 0),
              void 0 === c && (c = !0);
            var l,
              f = this.nodes().length,
              p = f + 2 * this._groups.length,
              d = (this._links.length, this._canvasSize[0]),
              v = this._canvasSize[1],
              y = new Array(p),
              g = new Array(p),
              _ = null,
              m = this._avoidOverlaps;
            this._nodes.forEach(function (t, n) {
              (t.index = n),
                void 0 === t.x && ((t.x = d / 2), (t.y = v / 2)),
                (y[n] = t.x),
                (g[n] = t.y);
            }),
              this._linkLengthCalculator && this._linkLengthCalculator(),
              this._distanceMatrix
                ? (l = this._distanceMatrix)
                : ((l = new a.Calculator(
                    p,
                    this._links,
                    t.getSourceIndex,
                    t.getTargetIndex,
                    function (t) {
                      return h.getLinkLength(t);
                    }
                  ).DistanceMatrix()),
                  (_ = s.Descent.createSquareMatrix(p, function () {
                    return 2;
                  })),
                  this._links.forEach(function (t) {
                    "number" == typeof t.source &&
                      (t.source = h._nodes[t.source]),
                      "number" == typeof t.target &&
                        (t.target = h._nodes[t.target]);
                  }),
                  this._links.forEach(function (n) {
                    var e = t.getSourceIndex(n),
                      r = t.getTargetIndex(n);
                    _[e][r] = _[r][e] = n.weight || 1;
                  }));
            var x = s.Descent.createSquareMatrix(p, function (t, n) {
              return l[t][n];
            });
            if (this._rootGroup && void 0 !== this._rootGroup.groups) {
              var b = f;
              this._groups.forEach(function (t) {
                !(function (t, n, e, r) {
                  (_[t][n] = _[n][t] = e), (x[t][n] = x[n][t] = r);
                })(b, b + 1, h._groupCompactness, 0.1),
                  (y[b] = 0),
                  (g[b++] = 0),
                  (y[b] = 0),
                  (g[b++] = 0);
              });
            } else this._rootGroup = { leaves: this._nodes, groups: [] };
            var w = this._constraints || [];
            this._directedLinkConstraints &&
              ((this.linkAccessor.getMinSeparation = this._directedLinkConstraints.getMinSeparation),
              (w = w.concat(
                o.generateDirectedEdgeConstraints(
                  f,
                  this._links,
                  this._directedLinkConstraints.axis,
                  this.linkAccessor
                )
              ))),
              this.avoidOverlaps(!1),
              (this._descent = new s.Descent([y, g], x)),
              this._descent.locks.clear();
            for (b = 0; b < f; ++b) {
              var k = this._nodes[b];
              if (k.fixed) {
                (k.px = k.x), (k.py = k.y);
                var M = [k.x, k.y];
                this._descent.locks.add(b, M);
              }
            }
            if (
              ((this._descent.threshold = this._threshold),
              this.initialLayout(n, y, g),
              w.length > 0 &&
                (this._descent.project = new u.Projection(
                  this._nodes,
                  this._groups,
                  this._rootGroup,
                  w
                ).projectFunctions()),
              this._descent.run(e),
              this.separateOverlappingComponents(d, v),
              this.avoidOverlaps(m),
              m &&
                (this._nodes.forEach(function (t, n) {
                  (t.x = y[n]), (t.y = g[n]);
                }),
                (this._descent.project = new u.Projection(
                  this._nodes,
                  this._groups,
                  this._rootGroup,
                  w,
                  !0
                ).projectFunctions()),
                this._nodes.forEach(function (t, n) {
                  (y[n] = t.x), (g[n] = t.y);
                })),
              (this._descent.G = _),
              this._descent.run(r),
              i)
            ) {
              (this._descent.snapStrength = 1e3),
                (this._descent.snapGridSize = this._nodes[0].width),
                (this._descent.numGridSnapNodes = f),
                (this._descent.scaleSnapByMaxH = f != p);
              var E = s.Descent.createSquareMatrix(p, function (t, n) {
                return t >= f || n >= f ? _[t][n] : 0;
              });
              (this._descent.G = E), this._descent.run(i);
            }
            return (
              this.updateNodePositions(),
              this.separateOverlappingComponents(d, v),
              c ? this.resume() : this
            );
          }),
          (t.prototype.initialLayout = function (n, e, r) {
            if (this._groups.length > 0 && n > 0) {
              var i = this._nodes.length,
                o = this._links.map(function (t) {
                  return { source: t.source.index, target: t.target.index };
                }),
                s = this._nodes.map(function (t) {
                  return { index: t.index };
                });
              this._groups.forEach(function (t, n) {
                s.push({ index: (t.index = i + n) });
              }),
                this._groups.forEach(function (t, n) {
                  void 0 !== t.leaves &&
                    t.leaves.forEach(function (n) {
                      return o.push({ source: t.index, target: n.index });
                    }),
                    void 0 !== t.groups &&
                      t.groups.forEach(function (n) {
                        return o.push({ source: t.index, target: n.index });
                      });
                }),
                new t()
                  .size(this.size())
                  .nodes(s)
                  .links(o)
                  .avoidOverlaps(!1)
                  .linkDistance(this.linkDistance())
                  .symmetricDiffLinkLengths(5)
                  .convergenceThreshold(1e-4)
                  .start(n, 0, 0, 0, !1),
                this._nodes.forEach(function (t) {
                  (e[t.index] = s[t.index].x), (r[t.index] = s[t.index].y);
                });
            } else this._descent.run(n);
          }),
          (t.prototype.separateOverlappingComponents = function (t, n) {
            var e = this;
            if (!this._distanceMatrix && this._handleDisconnected) {
              var r = this._descent.x[0],
                i = this._descent.x[1];
              this._nodes.forEach(function (t, n) {
                (t.x = r[n]), (t.y = i[n]);
              });
              var o = h.separateGraphs(this._nodes, this._links);
              h.applyPacking(o, t, n, this._defaultNodeSize),
                this._nodes.forEach(function (t, n) {
                  (e._descent.x[0][n] = t.x),
                    (e._descent.x[1][n] = t.y),
                    t.bounds &&
                      (t.bounds.setXCentre(t.x), t.bounds.setYCentre(t.y));
                });
            }
          }),
          (t.prototype.resume = function () {
            return this.alpha(0.1);
          }),
          (t.prototype.stop = function () {
            return this.alpha(0);
          }),
          (t.prototype.prepareEdgeRouting = function (t) {
            void 0 === t && (t = 0),
              (this._visibilityGraph = new c.TangentVisibilityGraph(
                this._nodes.map(function (n) {
                  return n.bounds.inflate(-t).vertices();
                })
              ));
          }),
          (t.prototype.routeEdge = function (t, n, e) {
            void 0 === n && (n = 5);
            var r = [],
              i = new c.TangentVisibilityGraph(this._visibilityGraph.P, {
                V: this._visibilityGraph.V,
                E: this._visibilityGraph.E,
              }),
              o = { x: t.source.x, y: t.source.y },
              s = { x: t.target.x, y: t.target.y },
              h = i.addPoint(o, t.source.index),
              l = i.addPoint(s, t.target.index);
            i.addEdgeIfVisible(o, s, t.source.index, t.target.index),
              void 0 !== e && e(i);
            var f = new a.Calculator(
              i.V.length,
              i.E,
              function (t) {
                return t.source.id;
              },
              function (t) {
                return t.target.id;
              },
              function (t) {
                return t.length();
              }
            ).PathFromNodeToNode(h.id, l.id);
            if (1 === f.length || f.length === i.V.length) {
              var p = u.makeEdgeBetween(
                t.source.innerBounds,
                t.target.innerBounds,
                n
              );
              r = [p.sourceIntersection, p.arrowStart];
            } else {
              for (
                var d = f.length - 2,
                  v = i.V[f[d]].p,
                  y = i.V[f[0]].p,
                  g =
                    ((r = [t.source.innerBounds.rayIntersection(v.x, v.y)]), d);
                g >= 0;
                --g
              )
                r.push(i.V[f[g]].p);
              r.push(u.makeEdgeTo(y, t.target.innerBounds, n));
            }
            return r;
          }),
          (t.getSourceIndex = function (t) {
            return "number" == typeof t.source ? t.source : t.source.index;
          }),
          (t.getTargetIndex = function (t) {
            return "number" == typeof t.target ? t.target : t.target.index;
          }),
          (t.linkId = function (n) {
            return t.getSourceIndex(n) + "-" + t.getTargetIndex(n);
          }),
          (t.dragStart = function (n) {
            l(n)
              ? t.storeOffset(n, t.dragOrigin(n))
              : (t.stopNode(n), (n.fixed |= 2));
          }),
          (t.stopNode = function (t) {
            (t.px = t.x), (t.py = t.y);
          }),
          (t.storeOffset = function (n, e) {
            void 0 !== n.leaves &&
              n.leaves.forEach(function (n) {
                (n.fixed |= 2),
                  t.stopNode(n),
                  (n._dragGroupOffsetX = n.x - e.x),
                  (n._dragGroupOffsetY = n.y - e.y);
              }),
              void 0 !== n.groups &&
                n.groups.forEach(function (n) {
                  return t.storeOffset(n, e);
                });
          }),
          (t.dragOrigin = function (t) {
            return l(t) ? { x: t.bounds.cx(), y: t.bounds.cy() } : t;
          }),
          (t.drag = function (n, e) {
            l(n)
              ? (void 0 !== n.leaves &&
                  n.leaves.forEach(function (t) {
                    n.bounds.setXCentre(e.x),
                      n.bounds.setYCentre(e.y),
                      (t.px = t._dragGroupOffsetX + e.x),
                      (t.py = t._dragGroupOffsetY + e.y);
                  }),
                void 0 !== n.groups &&
                  n.groups.forEach(function (n) {
                    return t.drag(n, e);
                  }))
              : ((n.px = e.x), (n.py = e.y));
          }),
          (t.dragEnd = function (n) {
            l(n)
              ? (void 0 !== n.leaves &&
                  n.leaves.forEach(function (n) {
                    t.dragEnd(n),
                      delete n._dragGroupOffsetX,
                      delete n._dragGroupOffsetY;
                  }),
                void 0 !== n.groups && n.groups.forEach(t.dragEnd))
              : (n.fixed &= -7);
          }),
          (t.mouseOver = function (t) {
            (t.fixed |= 4), (t.px = t.x), (t.py = t.y);
          }),
          (t.mouseOut = function (t) {
            t.fixed &= -5;
          }),
          t
        );
      })();
      n.Layout = f;
    },
    function (t, n, e) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, n) {
                t.__proto__ = n;
              }) ||
            function (t, n) {
              for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            }),
          function (t, n) {
            function e() {
              this.constructor = t;
            }
            r(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          });
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = e(6),
        s = e(9);
      function u(t) {
        return (
          (t.bounds =
            void 0 !== t.leaves
              ? t.leaves.reduce(function (t, n) {
                  return n.bounds.union(t);
                }, a.empty())
              : a.empty()),
          void 0 !== t.groups &&
            (t.bounds = t.groups.reduce(function (t, n) {
              return u(n).union(t);
            }, t.bounds)),
          (t.bounds = t.bounds.inflate(t.padding)),
          t.bounds
        );
      }
      n.computeGroupBounds = u;
      var a = (function () {
        function t(t, n, e, r) {
          (this.x = t), (this.X = n), (this.y = e), (this.Y = r);
        }
        return (
          (t.empty = function () {
            return new t(
              Number.POSITIVE_INFINITY,
              Number.NEGATIVE_INFINITY,
              Number.POSITIVE_INFINITY,
              Number.NEGATIVE_INFINITY
            );
          }),
          (t.prototype.cx = function () {
            return (this.x + this.X) / 2;
          }),
          (t.prototype.cy = function () {
            return (this.y + this.Y) / 2;
          }),
          (t.prototype.overlapX = function (t) {
            var n = this.cx(),
              e = t.cx();
            return n <= e && t.x < this.X
              ? this.X - t.x
              : e <= n && this.x < t.X
              ? t.X - this.x
              : 0;
          }),
          (t.prototype.overlapY = function (t) {
            var n = this.cy(),
              e = t.cy();
            return n <= e && t.y < this.Y
              ? this.Y - t.y
              : e <= n && this.y < t.Y
              ? t.Y - this.y
              : 0;
          }),
          (t.prototype.setXCentre = function (t) {
            var n = t - this.cx();
            (this.x += n), (this.X += n);
          }),
          (t.prototype.setYCentre = function (t) {
            var n = t - this.cy();
            (this.y += n), (this.Y += n);
          }),
          (t.prototype.width = function () {
            return this.X - this.x;
          }),
          (t.prototype.height = function () {
            return this.Y - this.y;
          }),
          (t.prototype.union = function (n) {
            return new t(
              Math.min(this.x, n.x),
              Math.max(this.X, n.X),
              Math.min(this.y, n.y),
              Math.max(this.Y, n.Y)
            );
          }),
          (t.prototype.lineIntersections = function (n, e, r, i) {
            for (
              var o = [
                  [this.x, this.y, this.X, this.y],
                  [this.X, this.y, this.X, this.Y],
                  [this.X, this.Y, this.x, this.Y],
                  [this.x, this.Y, this.x, this.y],
                ],
                s = [],
                u = 0;
              u < 4;
              ++u
            ) {
              var a = t.lineIntersection(
                n,
                e,
                r,
                i,
                o[u][0],
                o[u][1],
                o[u][2],
                o[u][3]
              );
              null !== a && s.push({ x: a.x, y: a.y });
            }
            return s;
          }),
          (t.prototype.rayIntersection = function (t, n) {
            var e = this.lineIntersections(this.cx(), this.cy(), t, n);
            return e.length > 0 ? e[0] : null;
          }),
          (t.prototype.vertices = function () {
            return [
              { x: this.x, y: this.y },
              { x: this.X, y: this.y },
              { x: this.X, y: this.Y },
              { x: this.x, y: this.Y },
            ];
          }),
          (t.lineIntersection = function (t, n, e, r, i, o, s, u) {
            var a = e - t,
              c = s - i,
              h = r - n,
              l = u - o,
              f = l * a - c * h;
            if (0 == f) return null;
            var p = t - i,
              d = n - o,
              v = (c * d - l * p) / f,
              y = (a * d - h * p) / f;
            return v >= 0 && v <= 1 && y >= 0 && y <= 1
              ? { x: t + v * a, y: n + v * h }
              : null;
          }),
          (t.prototype.inflate = function (n) {
            return new t(this.x - n, this.X + n, this.y - n, this.Y + n);
          }),
          t
        );
      })();
      (n.Rectangle = a),
        (n.makeEdgeBetween = function (t, n, e) {
          var r = t.rayIntersection(n.cx(), n.cy()) || { x: t.cx(), y: t.cy() },
            i = n.rayIntersection(t.cx(), t.cy()) || { x: n.cx(), y: n.cy() },
            o = i.x - r.x,
            s = i.y - r.y,
            u = Math.sqrt(o * o + s * s),
            a = u - e;
          return {
            sourceIntersection: r,
            targetIntersection: i,
            arrowStart: { x: r.x + (a * o) / u, y: r.y + (a * s) / u },
          };
        }),
        (n.makeEdgeTo = function (t, n, e) {
          var r = n.rayIntersection(t.x, t.y);
          r || (r = { x: n.cx(), y: n.cy() });
          var i = r.x - t.x,
            o = r.y - t.y,
            s = Math.sqrt(i * i + o * o);
          return { x: r.x - (e * i) / s, y: r.y - (e * o) / s };
        });
      var c = (function () {
          return function (t, n, e) {
            (this.v = t),
              (this.r = n),
              (this.pos = e),
              (this.prev = f()),
              (this.next = f());
          };
        })(),
        h = (function () {
          return function (t, n, e) {
            (this.isOpen = t), (this.v = n), (this.pos = e);
          };
        })();
      function l(t, n) {
        return t.pos > n.pos
          ? 1
          : t.pos < n.pos
          ? -1
          : t.isOpen
          ? -1
          : n.isOpen
          ? 1
          : 0;
      }
      function f() {
        return new s.RBTree(function (t, n) {
          return t.pos - n.pos;
        });
      }
      var p = {
          getCentre: function (t) {
            return t.cx();
          },
          getOpen: function (t) {
            return t.y;
          },
          getClose: function (t) {
            return t.Y;
          },
          getSize: function (t) {
            return t.width();
          },
          makeRect: function (t, n, e, r) {
            return new a(e - r / 2, e + r / 2, t, n);
          },
          findNeighbours: function (t, n) {
            var e = function (e, r) {
              for (var i, o = n.findIter(t); null !== (i = o[e]()); ) {
                var s = i.r.overlapX(t.r);
                if (
                  ((s <= 0 || s <= i.r.overlapY(t.r)) &&
                    (t[e].insert(i), i[r].insert(t)),
                  s <= 0)
                )
                  break;
              }
            };
            e("next", "prev"), e("prev", "next");
          },
        },
        d = {
          getCentre: function (t) {
            return t.cy();
          },
          getOpen: function (t) {
            return t.x;
          },
          getClose: function (t) {
            return t.X;
          },
          getSize: function (t) {
            return t.height();
          },
          makeRect: function (t, n, e, r) {
            return new a(t, n, e - r / 2, e + r / 2);
          },
          findNeighbours: function (t, n) {
            var e = function (e, r) {
              var i = n.findIter(t)[e]();
              null !== i &&
                i.r.overlapX(t.r) > 0 &&
                (t[e].insert(i), i[r].insert(t));
            };
            e("next", "prev"), e("prev", "next");
          },
        };
      function v(t, n, e, r) {
        void 0 === r && (r = !1);
        var i = t.padding,
          o = void 0 !== t.groups ? t.groups.length : 0,
          s = void 0 !== t.leaves ? t.leaves.length : 0,
          u = o
            ? t.groups.reduce(function (t, r) {
                return t.concat(v(r, n, e, !0));
              }, [])
            : [],
          a = (r ? 2 : 0) + s + o,
          c = new Array(a),
          h = new Array(a),
          l = 0,
          f = function (t, n) {
            (h[l] = t), (c[l++] = n);
          };
        if (r) {
          var p = t.bounds,
            d = n.getCentre(p),
            g = n.getSize(p) / 2,
            _ = n.getOpen(p),
            m = n.getClose(p),
            x = d - g + i / 2,
            b = d + g - i / 2;
          (t.minVar.desiredPosition = x),
            f(n.makeRect(_, m, x, i), t.minVar),
            (t.maxVar.desiredPosition = b),
            f(n.makeRect(_, m, b, i), t.maxVar);
        }
        s &&
          t.leaves.forEach(function (t) {
            return f(t.bounds, t.variable);
          }),
          o &&
            t.groups.forEach(function (t) {
              var e = t.bounds;
              f(
                n.makeRect(
                  n.getOpen(e),
                  n.getClose(e),
                  n.getCentre(e),
                  n.getSize(e)
                ),
                t.minVar
              );
            });
        var w = y(h, c, n, e);
        return (
          o &&
            (c.forEach(function (t) {
              (t.cOut = []), (t.cIn = []);
            }),
            w.forEach(function (t) {
              t.left.cOut.push(t), t.right.cIn.push(t);
            }),
            t.groups.forEach(function (t) {
              var e = (t.padding - n.getSize(t.bounds)) / 2;
              t.minVar.cIn.forEach(function (t) {
                return (t.gap += e);
              }),
                t.minVar.cOut.forEach(function (n) {
                  (n.left = t.maxVar), (n.gap += e);
                });
            })),
          u.concat(w)
        );
      }
      function y(t, n, e, r) {
        var i,
          s = t.length,
          u = 2 * s;
        console.assert(n.length >= s);
        var a = new Array(u);
        for (i = 0; i < s; ++i) {
          var p = t[i],
            d = new c(n[i], p, e.getCentre(p));
          (a[i] = new h(!0, d, e.getOpen(p))),
            (a[i + s] = new h(!1, d, e.getClose(p)));
        }
        a.sort(l);
        var v = new Array(),
          y = f();
        for (i = 0; i < u; ++i) {
          var g = a[i];
          d = g.v;
          if (g.isOpen) y.insert(d), e.findNeighbours(d, y);
          else {
            y.remove(d);
            var _ = function (t, n) {
                var i = (e.getSize(t.r) + e.getSize(n.r)) / 2 + r;
                v.push(new o.Constraint(t.v, n.v, i));
              },
              m = function (t, n, e) {
                for (var r, i = d[t].iterator(); null !== (r = i[t]()); )
                  e(r, d), r[n].remove(d);
              };
            m("prev", "next", function (t, n) {
              return _(t, n);
            }),
              m("next", "prev", function (t, n) {
                return _(n, t);
              });
          }
        }
        return console.assert(0 === y.size), v;
      }
      function g(t, n) {
        return y(t, n, p, 1e-6);
      }
      function _(t, n) {
        return y(t, n, d, 1e-6);
      }
      function m(t) {
        return v(t, p, 1e-6);
      }
      function x(t) {
        return v(t, d, 1e-6);
      }
      (n.generateXConstraints = g),
        (n.generateYConstraints = _),
        (n.generateXGroupConstraints = m),
        (n.generateYGroupConstraints = x),
        (n.removeOverlaps = function (t) {
          var n = t.map(function (t) {
              return new o.Variable(t.cx());
            }),
            e = g(t, n),
            r = new o.Solver(n, e);
          r.solve(),
            n.forEach(function (n, e) {
              return t[e].setXCentre(n.position());
            }),
            (n = t.map(function (t) {
              return new o.Variable(t.cy());
            })),
            (e = _(t, n)),
            (r = new o.Solver(n, e)).solve(),
            n.forEach(function (n, e) {
              return t[e].setYCentre(n.position());
            });
        });
      var b = (function (t) {
        function n(n, e) {
          var r = t.call(this, 0, e) || this;
          return (r.index = n), r;
        }
        return i(n, t), n;
      })(o.Variable);
      n.IndexedVariable = b;
      var w = (function () {
        function t(t, n, e, r, i) {
          void 0 === e && (e = null),
            void 0 === r && (r = null),
            void 0 === i && (i = !1);
          var o = this;
          if (
            ((this.nodes = t),
            (this.groups = n),
            (this.rootGroup = e),
            (this.avoidOverlaps = i),
            (this.variables = t.map(function (t, n) {
              return (t.variable = new b(n, 1));
            })),
            r && this.createConstraints(r),
            i && e && void 0 !== e.groups)
          ) {
            t.forEach(function (t) {
              if (t.width && t.height) {
                var n = t.width / 2,
                  e = t.height / 2;
                t.bounds = new a(t.x - n, t.x + n, t.y - e, t.y + e);
              } else t.bounds = new a(t.x, t.x, t.y, t.y);
            }),
              u(e);
            var s = t.length;
            n.forEach(function (t) {
              (o.variables[s] = t.minVar = new b(
                s++,
                void 0 !== t.stiffness ? t.stiffness : 0.01
              )),
                (o.variables[s] = t.maxVar = new b(
                  s++,
                  void 0 !== t.stiffness ? t.stiffness : 0.01
                ));
            });
          }
        }
        return (
          (t.prototype.createSeparation = function (t) {
            return new o.Constraint(
              this.nodes[t.left].variable,
              this.nodes[t.right].variable,
              t.gap,
              void 0 !== t.equality && t.equality
            );
          }),
          (t.prototype.makeFeasible = function (t) {
            var n = this;
            if (this.avoidOverlaps) {
              var e = "x",
                r = "width";
              "x" === t.axis && ((e = "y"), (r = "height"));
              var i = t.offsets
                  .map(function (t) {
                    return n.nodes[t.node];
                  })
                  .sort(function (t, n) {
                    return t[e] - n[e];
                  }),
                o = null;
              i.forEach(function (t) {
                if (o) {
                  var n = o[e] + o[r];
                  n > t[e] && (t[e] = n);
                }
                o = t;
              });
            }
          }),
          (t.prototype.createAlignment = function (t) {
            var n = this,
              e = this.nodes[t.offsets[0].node].variable;
            this.makeFeasible(t);
            var r = "x" === t.axis ? this.xConstraints : this.yConstraints;
            t.offsets.slice(1).forEach(function (t) {
              var i = n.nodes[t.node].variable;
              r.push(new o.Constraint(e, i, t.offset, !0));
            });
          }),
          (t.prototype.createConstraints = function (t) {
            var n = this,
              e = function (t) {
                return void 0 === t.type || "separation" === t.type;
              };
            (this.xConstraints = t
              .filter(function (t) {
                return "x" === t.axis && e(t);
              })
              .map(function (t) {
                return n.createSeparation(t);
              })),
              (this.yConstraints = t
                .filter(function (t) {
                  return "y" === t.axis && e(t);
                })
                .map(function (t) {
                  return n.createSeparation(t);
                })),
              t
                .filter(function (t) {
                  return "alignment" === t.type;
                })
                .forEach(function (t) {
                  return n.createAlignment(t);
                });
          }),
          (t.prototype.setupVariablesAndBounds = function (t, n, e, r) {
            this.nodes.forEach(function (i, o) {
              i.fixed
                ? ((i.variable.weight = i.fixedWeight ? i.fixedWeight : 1e3),
                  (e[o] = r(i)))
                : (i.variable.weight = 1);
              var s = (i.width || 0) / 2,
                u = (i.height || 0) / 2,
                c = t[o],
                h = n[o];
              i.bounds = new a(c - s, c + s, h - u, h + u);
            });
          }),
          (t.prototype.xProject = function (t, n, e) {
            (this.rootGroup || this.avoidOverlaps || this.xConstraints) &&
              this.project(
                t,
                n,
                t,
                e,
                function (t) {
                  return t.px;
                },
                this.xConstraints,
                m,
                function (t) {
                  return t.bounds.setXCentre(
                    (e[t.variable.index] = t.variable.position())
                  );
                },
                function (t) {
                  var n = (e[t.minVar.index] = t.minVar.position()),
                    r = (e[t.maxVar.index] = t.maxVar.position()),
                    i = t.padding / 2;
                  (t.bounds.x = n - i), (t.bounds.X = r + i);
                }
              );
          }),
          (t.prototype.yProject = function (t, n, e) {
            (this.rootGroup || this.yConstraints) &&
              this.project(
                t,
                n,
                n,
                e,
                function (t) {
                  return t.py;
                },
                this.yConstraints,
                x,
                function (t) {
                  return t.bounds.setYCentre(
                    (e[t.variable.index] = t.variable.position())
                  );
                },
                function (t) {
                  var n = (e[t.minVar.index] = t.minVar.position()),
                    r = (e[t.maxVar.index] = t.maxVar.position()),
                    i = t.padding / 2;
                  (t.bounds.y = n - i), (t.bounds.Y = r + i);
                }
              );
          }),
          (t.prototype.projectFunctions = function () {
            var t = this;
            return [
              function (n, e, r) {
                return t.xProject(n, e, r);
              },
              function (n, e, r) {
                return t.yProject(n, e, r);
              },
            ];
          }),
          (t.prototype.project = function (t, n, e, r, i, o, s, a, c) {
            this.setupVariablesAndBounds(t, n, r, i),
              this.rootGroup &&
                this.avoidOverlaps &&
                (u(this.rootGroup), (o = o.concat(s(this.rootGroup)))),
              this.solve(this.variables, o, e, r),
              this.nodes.forEach(a),
              this.rootGroup &&
                this.avoidOverlaps &&
                (this.groups.forEach(c), u(this.rootGroup));
          }),
          (t.prototype.solve = function (t, n, e, r) {
            var i = new o.Solver(t, n);
            i.setStartingPositions(e), i.setDesiredPositions(r), i.solve();
          }),
          t
        );
      })();
      n.Projection = w;
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(10),
        i = (function () {
          return function (t, n) {
            (this.id = t), (this.distance = n);
          };
        })(),
        o = (function () {
          return function (t) {
            (this.id = t), (this.neighbours = []);
          };
        })(),
        s = (function () {
          return function (t, n, e) {
            (this.node = t), (this.prev = n), (this.d = e);
          };
        })(),
        u = (function () {
          function t(t, n, e, r, s) {
            (this.n = t), (this.es = n), (this.neighbours = new Array(this.n));
            for (var u = this.n; u--; ) this.neighbours[u] = new o(u);
            for (u = this.es.length; u--; ) {
              var a = this.es[u],
                c = e(a),
                h = r(a),
                l = s(a);
              this.neighbours[c].neighbours.push(new i(h, l)),
                this.neighbours[h].neighbours.push(new i(c, l));
            }
          }
          return (
            (t.prototype.DistanceMatrix = function () {
              for (var t = new Array(this.n), n = 0; n < this.n; ++n)
                t[n] = this.dijkstraNeighbours(n);
              return t;
            }),
            (t.prototype.DistancesFromNode = function (t) {
              return this.dijkstraNeighbours(t);
            }),
            (t.prototype.PathFromNodeToNode = function (t, n) {
              return this.dijkstraNeighbours(t, n);
            }),
            (t.prototype.PathFromNodeToNodeWithPrevCost = function (t, n, e) {
              var i = new r.PriorityQueue(function (t, n) {
                  return t.d <= n.d;
                }),
                o = this.neighbours[t],
                u = new s(o, null, 0),
                a = {};
              for (i.push(u); !i.empty() && (o = (u = i.pop()).node).id !== n; )
                for (var c = o.neighbours.length; c--; ) {
                  var h = o.neighbours[c],
                    l = this.neighbours[h.id];
                  if (!u.prev || l.id !== u.prev.node.id) {
                    var f = l.id + "," + o.id;
                    if (!(f in a && a[f] <= u.d)) {
                      var p = u.prev ? e(u.prev.node.id, o.id, l.id) : 0,
                        d = u.d + h.distance + p;
                      (a[f] = d), i.push(new s(l, u, d));
                    }
                  }
                }
              for (var v = []; u.prev; ) (u = u.prev), v.push(u.node.id);
              return v;
            }),
            (t.prototype.dijkstraNeighbours = function (t, n) {
              void 0 === n && (n = -1);
              for (
                var e = new r.PriorityQueue(function (t, n) {
                    return t.d <= n.d;
                  }),
                  i = this.neighbours.length,
                  o = new Array(i);
                i--;

              ) {
                var s = this.neighbours[i];
                (s.d = i === t ? 0 : Number.POSITIVE_INFINITY),
                  (s.q = e.push(s));
              }
              for (; !e.empty(); ) {
                var u = e.pop();
                if (((o[u.id] = u.d), u.id === n)) {
                  for (var a = [], c = u; void 0 !== c.prev; )
                    a.push(c.prev.id), (c = c.prev);
                  return a;
                }
                for (i = u.neighbours.length; i--; ) {
                  var h = u.neighbours[i],
                    l = ((c = this.neighbours[h.id]), u.d + h.distance);
                  u.d !== Number.MAX_VALUE &&
                    c.d > l &&
                    ((c.d = l),
                    (c.prev = u),
                    e.reduceKey(c.q, c, function (t, n) {
                      return (t.q = n);
                    }));
                }
              }
              return o;
            }),
            t
          );
        })();
      n.Calculator = u;
    },
    function (t, n, e) {
      "use strict";
      function r(t, n) {
        var e = {};
        for (var r in t) e[r] = {};
        for (var r in n) e[r] = {};
        return Object.keys(e).length;
      }
      function i(t, n) {
        var e = 0;
        for (var r in t) void 0 !== n[r] && ++e;
        return e;
      }
      function o(t, n, e, r) {
        var i = (function (t, n) {
          var e = {},
            r = function (t, n) {
              void 0 === e[t] && (e[t] = {}), (e[t][n] = {});
            };
          return (
            t.forEach(function (t) {
              var e = n.getSourceIndex(t),
                i = n.getTargetIndex(t);
              r(e, i), r(i, e);
            }),
            e
          );
        })(t, r);
        t.forEach(function (t) {
          var o = i[r.getSourceIndex(t)],
            s = i[r.getTargetIndex(t)];
          r.setLength(t, 1 + n * e(o, s));
        });
      }
      function s(t, n, e) {
        var r = [],
          i = 0,
          o = [],
          s = [];
        function u(t) {
          (t.index = t.lowlink = i++), o.push(t), (t.onStack = !0);
          for (var n = 0, e = t.out; n < e.length; n++) {
            var r = e[n];
            void 0 === r.index
              ? (u(r), (t.lowlink = Math.min(t.lowlink, r.lowlink)))
              : r.onStack && (t.lowlink = Math.min(t.lowlink, r.index));
          }
          if (t.lowlink === t.index) {
            for (
              var a = [];
              o.length && (((r = o.pop()).onStack = !1), a.push(r), r !== t);

            );
            s.push(
              a.map(function (t) {
                return t.id;
              })
            );
          }
        }
        for (var a = 0; a < t; a++) r.push({ id: a, out: [] });
        for (var c = 0, h = n; c < h.length; c++) {
          var l = h[c],
            f = r[e.getSourceIndex(l)],
            p = r[e.getTargetIndex(l)];
          f.out.push(p);
        }
        for (var d = 0, v = r; d < v.length; d++) {
          var y = v[d];
          void 0 === y.index && u(y);
        }
        return s;
      }
      Object.defineProperty(n, "__esModule", { value: !0 }),
        (n.symmetricDiffLinkLengths = function (t, n, e) {
          void 0 === e && (e = 1),
            o(
              t,
              e,
              function (t, n) {
                return Math.sqrt(r(t, n) - i(t, n));
              },
              n
            );
        }),
        (n.jaccardLinkLengths = function (t, n, e) {
          void 0 === e && (e = 1),
            o(
              t,
              e,
              function (t, n) {
                return Math.min(Object.keys(t).length, Object.keys(n).length) <
                  1.1
                  ? 0
                  : i(t, n) / r(t, n);
              },
              n
            );
        }),
        (n.generateDirectedEdgeConstraints = function (t, n, e, r) {
          var i = s(t, n, r),
            o = {};
          i.forEach(function (t, n) {
            return t.forEach(function (t) {
              return (o[t] = n);
            });
          });
          var u = [];
          return (
            n.forEach(function (t) {
              var n = r.getSourceIndex(t),
                i = r.getTargetIndex(t);
              o[n] !== o[i] &&
                u.push({
                  axis: e,
                  left: n,
                  right: i,
                  gap: r.getMinSeparation(t),
                });
            }),
            u
          );
        }),
        (n.stronglyConnectedComponents = s);
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = (function () {
        function t() {
          this.locks = {};
        }
        return (
          (t.prototype.add = function (t, n) {
            this.locks[t] = n;
          }),
          (t.prototype.clear = function () {
            this.locks = {};
          }),
          (t.prototype.isEmpty = function () {
            for (var t in this.locks) return !1;
            return !0;
          }),
          (t.prototype.apply = function (t) {
            for (var n in this.locks) t(Number(n), this.locks[n]);
          }),
          t
        );
      })();
      n.Locks = r;
      var i = (function () {
        function t(t, n, e) {
          void 0 === e && (e = null),
            (this.D = n),
            (this.G = e),
            (this.threshold = 1e-4),
            (this.numGridSnapNodes = 0),
            (this.snapGridSize = 100),
            (this.snapStrength = 1e3),
            (this.scaleSnapByMaxH = !1),
            (this.random = new o()),
            (this.project = null),
            (this.x = t),
            (this.k = t.length);
          var i = (this.n = t[0].length);
          (this.H = new Array(this.k)),
            (this.g = new Array(this.k)),
            (this.Hd = new Array(this.k)),
            (this.a = new Array(this.k)),
            (this.b = new Array(this.k)),
            (this.c = new Array(this.k)),
            (this.d = new Array(this.k)),
            (this.e = new Array(this.k)),
            (this.ia = new Array(this.k)),
            (this.ib = new Array(this.k)),
            (this.xtmp = new Array(this.k)),
            (this.locks = new r()),
            (this.minD = Number.MAX_VALUE);
          for (var s, u = i; u--; )
            for (s = i; --s > u; ) {
              var a = n[u][s];
              a > 0 && a < this.minD && (this.minD = a);
            }
          for (
            this.minD === Number.MAX_VALUE && (this.minD = 1), u = this.k;
            u--;

          ) {
            for (
              this.g[u] = new Array(i), this.H[u] = new Array(i), s = i;
              s--;

            )
              this.H[u][s] = new Array(i);
            (this.Hd[u] = new Array(i)),
              (this.a[u] = new Array(i)),
              (this.b[u] = new Array(i)),
              (this.c[u] = new Array(i)),
              (this.d[u] = new Array(i)),
              (this.e[u] = new Array(i)),
              (this.ia[u] = new Array(i)),
              (this.ib[u] = new Array(i)),
              (this.xtmp[u] = new Array(i));
          }
        }
        return (
          (t.createSquareMatrix = function (t, n) {
            for (var e = new Array(t), r = 0; r < t; ++r) {
              e[r] = new Array(t);
              for (var i = 0; i < t; ++i) e[r][i] = n(r, i);
            }
            return e;
          }),
          (t.prototype.offsetDir = function () {
            for (
              var t = this, n = new Array(this.k), e = 0, r = 0;
              r < this.k;
              ++r
            ) {
              var i = (n[r] = this.random.getNextBetween(0.01, 1) - 0.5);
              e += i * i;
            }
            return (
              (e = Math.sqrt(e)),
              n.map(function (n) {
                return n * (t.minD / e);
              })
            );
          }),
          (t.prototype.computeDerivatives = function (t) {
            var n = this,
              e = this.n;
            if (!(e < 1)) {
              for (
                var r,
                  i = new Array(this.k),
                  o = new Array(this.k),
                  s = new Array(this.k),
                  u = 0,
                  a = 0;
                a < e;
                ++a
              ) {
                for (r = 0; r < this.k; ++r) s[r] = this.g[r][a] = 0;
                for (var c = 0; c < e; ++c)
                  if (a !== c) {
                    for (var h = e; h--; ) {
                      var l = 0;
                      for (r = 0; r < this.k; ++r) {
                        var f = (i[r] = t[r][a] - t[r][c]);
                        l += o[r] = f * f;
                      }
                      if (l > 1e-9) break;
                      var p = this.offsetDir();
                      for (r = 0; r < this.k; ++r) t[r][c] += p[r];
                    }
                    var d = Math.sqrt(l),
                      v = this.D[a][c],
                      y = null != this.G ? this.G[a][c] : 1;
                    if ((y > 1 && d > v) || !isFinite(v))
                      for (r = 0; r < this.k; ++r) this.H[r][a][c] = 0;
                    else {
                      y > 1 && (y = 1);
                      var g = v * v,
                        _ = (2 * y * (d - v)) / (g * d),
                        m = d * d * d,
                        x = (2 * -y) / (g * m);
                      for (
                        isFinite(_) || console.log(_), r = 0;
                        r < this.k;
                        ++r
                      )
                        (this.g[r][a] += i[r] * _),
                          (s[r] -= this.H[r][a][c] =
                            x * (m + v * (o[r] - l) + d * l));
                    }
                  }
                for (r = 0; r < this.k; ++r)
                  u = Math.max(u, (this.H[r][a][a] = s[r]));
              }
              var b = this.snapGridSize / 2,
                w = this.snapGridSize,
                k = this.snapStrength / (b * b),
                M = this.numGridSnapNodes;
              for (a = 0; a < M; ++a)
                for (r = 0; r < this.k; ++r) {
                  var E = this.x[r][a],
                    S = E / w,
                    A = S % 1,
                    O = S - A;
                  -b <
                    (f =
                      Math.abs(A) <= 0.5
                        ? E - O * w
                        : E > 0
                        ? E - (O + 1) * w
                        : E - (O - 1) * w) &&
                    f <= b &&
                    (this.scaleSnapByMaxH
                      ? ((this.g[r][a] += u * k * f),
                        (this.H[r][a][a] += u * k))
                      : ((this.g[r][a] += k * f), (this.H[r][a][a] += k)));
                }
              this.locks.isEmpty() ||
                this.locks.apply(function (e, i) {
                  for (r = 0; r < n.k; ++r)
                    (n.H[r][e][e] += u), (n.g[r][e] -= u * (i[r] - t[r][e]));
                });
            }
          }),
          (t.dotProd = function (t, n) {
            for (var e = 0, r = t.length; r--; ) e += t[r] * n[r];
            return e;
          }),
          (t.rightMultiply = function (n, e, r) {
            for (var i = n.length; i--; ) r[i] = t.dotProd(n[i], e);
          }),
          (t.prototype.computeStepSize = function (n) {
            for (var e = 0, r = 0, i = 0; i < this.k; ++i)
              (e += t.dotProd(this.g[i], n[i])),
                t.rightMultiply(this.H[i], n[i], this.Hd[i]),
                (r += t.dotProd(n[i], this.Hd[i]));
            return 0 !== r && isFinite(r) ? (1 * e) / r : 0;
          }),
          (t.prototype.reduceStress = function () {
            this.computeDerivatives(this.x);
            for (var t = this.computeStepSize(this.g), n = 0; n < this.k; ++n)
              this.takeDescentStep(this.x[n], this.g[n], t);
            return this.computeStress();
          }),
          (t.copy = function (t, n) {
            for (var e = t.length, r = n[0].length, i = 0; i < e; ++i)
              for (var o = 0; o < r; ++o) n[i][o] = t[i][o];
          }),
          (t.prototype.stepAndProject = function (n, e, r, i) {
            t.copy(n, e),
              this.takeDescentStep(e[0], r[0], i),
              this.project && this.project[0](n[0], n[1], e[0]),
              this.takeDescentStep(e[1], r[1], i),
              this.project && this.project[1](e[0], n[1], e[1]);
            for (var o = 2; o < this.k; o++)
              this.takeDescentStep(e[o], r[o], i);
          }),
          (t.mApply = function (t, n, e) {
            for (var r = t; r-- > 0; ) for (var i = n; i-- > 0; ) e(r, i);
          }),
          (t.prototype.matrixApply = function (n) {
            t.mApply(this.k, this.n, n);
          }),
          (t.prototype.computeNextPosition = function (t, n) {
            var e = this;
            this.computeDerivatives(t);
            var r = this.computeStepSize(this.g);
            if ((this.stepAndProject(t, n, this.g, r), this.project)) {
              this.matrixApply(function (r, i) {
                return (e.e[r][i] = t[r][i] - n[r][i]);
              });
              var i = this.computeStepSize(this.e);
              (i = Math.max(0.2, Math.min(i, 1))),
                this.stepAndProject(t, n, this.e, i);
            }
          }),
          (t.prototype.run = function (t) {
            for (var n = Number.MAX_VALUE, e = !1; !e && t-- > 0; ) {
              var r = this.rungeKutta();
              (e = Math.abs(n / r - 1) < this.threshold), (n = r);
            }
            return n;
          }),
          (t.prototype.rungeKutta = function () {
            var n = this;
            this.computeNextPosition(this.x, this.a),
              t.mid(this.x, this.a, this.ia),
              this.computeNextPosition(this.ia, this.b),
              t.mid(this.x, this.b, this.ib),
              this.computeNextPosition(this.ib, this.c),
              this.computeNextPosition(this.c, this.d);
            var e = 0;
            return (
              this.matrixApply(function (t, r) {
                var i =
                    (n.a[t][r] + 2 * n.b[t][r] + 2 * n.c[t][r] + n.d[t][r]) / 6,
                  o = n.x[t][r] - i;
                (e += o * o), (n.x[t][r] = i);
              }),
              e
            );
          }),
          (t.mid = function (n, e, r) {
            t.mApply(n.length, n[0].length, function (t, i) {
              return (r[t][i] = n[t][i] + (e[t][i] - n[t][i]) / 2);
            });
          }),
          (t.prototype.takeDescentStep = function (t, n, e) {
            for (var r = 0; r < this.n; ++r) t[r] = t[r] - e * n[r];
          }),
          (t.prototype.computeStress = function () {
            for (var t = 0, n = 0, e = this.n - 1; n < e; ++n)
              for (var r = n + 1, i = this.n; r < i; ++r) {
                for (var o = 0, s = 0; s < this.k; ++s) {
                  var u = this.x[s][n] - this.x[s][r];
                  o += u * u;
                }
                o = Math.sqrt(o);
                var a = this.D[n][r];
                if (isFinite(a)) {
                  var c = a - o;
                  t += (c * c) / (a * a);
                }
              }
            return t;
          }),
          (t.zeroDistance = 1e-10),
          t
        );
      })();
      n.Descent = i;
      var o = (function () {
        function t(t) {
          void 0 === t && (t = 1),
            (this.seed = t),
            (this.a = 214013),
            (this.c = 2531011),
            (this.m = 2147483648),
            (this.range = 32767);
        }
        return (
          (t.prototype.getNext = function () {
            return (
              (this.seed = (this.seed * this.a + this.c) % this.m),
              (this.seed >> 16) / this.range
            );
          }),
          (t.prototype.getNextBetween = function (t, n) {
            return t + this.getNext() * (n - t);
          }),
          t
        );
      })();
      n.PseudoRandom = o;
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = (function () {
        function t(t) {
          (this.scale = t), (this.AB = 0), (this.AD = 0), (this.A2 = 0);
        }
        return (
          (t.prototype.addVariable = function (t) {
            var n = this.scale / t.scale,
              e = t.offset / t.scale,
              r = t.weight;
            (this.AB += r * n * e),
              (this.AD += r * n * t.desiredPosition),
              (this.A2 += r * n * n);
          }),
          (t.prototype.getPosn = function () {
            return (this.AD - this.AB) / this.A2;
          }),
          t
        );
      })();
      n.PositionStats = r;
      var i = (function () {
        function t(t, n, e, r) {
          void 0 === r && (r = !1),
            (this.left = t),
            (this.right = n),
            (this.gap = e),
            (this.equality = r),
            (this.active = !1),
            (this.unsatisfiable = !1),
            (this.left = t),
            (this.right = n),
            (this.gap = e),
            (this.equality = r);
        }
        return (
          (t.prototype.slack = function () {
            return this.unsatisfiable
              ? Number.MAX_VALUE
              : this.right.scale * this.right.position() -
                  this.gap -
                  this.left.scale * this.left.position();
          }),
          t
        );
      })();
      n.Constraint = i;
      var o = (function () {
        function t(t, n, e) {
          void 0 === n && (n = 1),
            void 0 === e && (e = 1),
            (this.desiredPosition = t),
            (this.weight = n),
            (this.scale = e),
            (this.offset = 0);
        }
        return (
          (t.prototype.dfdv = function () {
            return 2 * this.weight * (this.position() - this.desiredPosition);
          }),
          (t.prototype.position = function () {
            return (
              (this.block.ps.scale * this.block.posn + this.offset) / this.scale
            );
          }),
          (t.prototype.visitNeighbours = function (t, n) {
            var e = function (e, r) {
              return e.active && t !== r && n(e, r);
            };
            this.cOut.forEach(function (t) {
              return e(t, t.right);
            }),
              this.cIn.forEach(function (t) {
                return e(t, t.left);
              });
          }),
          t
        );
      })();
      n.Variable = o;
      var s = (function () {
        function t(t) {
          (this.vars = []),
            (t.offset = 0),
            (this.ps = new r(t.scale)),
            this.addVariable(t);
        }
        return (
          (t.prototype.addVariable = function (t) {
            (t.block = this),
              this.vars.push(t),
              this.ps.addVariable(t),
              (this.posn = this.ps.getPosn());
          }),
          (t.prototype.updateWeightedPosition = function () {
            this.ps.AB = this.ps.AD = this.ps.A2 = 0;
            for (var t = 0, n = this.vars.length; t < n; ++t)
              this.ps.addVariable(this.vars[t]);
            this.posn = this.ps.getPosn();
          }),
          (t.prototype.compute_lm = function (t, n, e) {
            var r = this,
              i = t.dfdv();
            return (
              t.visitNeighbours(n, function (n, o) {
                var s = r.compute_lm(o, t, e);
                o === n.right
                  ? ((i += s * n.left.scale), (n.lm = s))
                  : ((i += s * n.right.scale), (n.lm = -s)),
                  e(n);
              }),
              i / t.scale
            );
          }),
          (t.prototype.populateSplitBlock = function (t, n) {
            var e = this;
            t.visitNeighbours(n, function (n, r) {
              (r.offset = t.offset + (r === n.right ? n.gap : -n.gap)),
                e.addVariable(r),
                e.populateSplitBlock(r, t);
            });
          }),
          (t.prototype.traverse = function (t, n, e, r) {
            var i = this;
            void 0 === e && (e = this.vars[0]),
              void 0 === r && (r = null),
              e.visitNeighbours(r, function (r, o) {
                n.push(t(r)), i.traverse(t, n, o, e);
              });
          }),
          (t.prototype.findMinLM = function () {
            var t = null;
            return (
              this.compute_lm(this.vars[0], null, function (n) {
                !n.equality && (null === t || n.lm < t.lm) && (t = n);
              }),
              t
            );
          }),
          (t.prototype.findMinLMBetween = function (t, n) {
            this.compute_lm(t, null, function () {});
            var e = null;
            return (
              this.findPath(t, null, n, function (t, n) {
                !t.equality &&
                  t.right === n &&
                  (null === e || t.lm < e.lm) &&
                  (e = t);
              }),
              e
            );
          }),
          (t.prototype.findPath = function (t, n, e, r) {
            var i = this,
              o = !1;
            return (
              t.visitNeighbours(n, function (n, s) {
                o ||
                  (s !== e && !i.findPath(s, t, e, r)) ||
                  ((o = !0), r(n, s));
              }),
              o
            );
          }),
          (t.prototype.isActiveDirectedPathBetween = function (t, n) {
            if (t === n) return !0;
            for (var e = t.cOut.length; e--; ) {
              var r = t.cOut[e];
              if (r.active && this.isActiveDirectedPathBetween(r.right, n))
                return !0;
            }
            return !1;
          }),
          (t.split = function (n) {
            return (
              (n.active = !1),
              [t.createSplitBlock(n.left), t.createSplitBlock(n.right)]
            );
          }),
          (t.createSplitBlock = function (n) {
            var e = new t(n);
            return e.populateSplitBlock(n, null), e;
          }),
          (t.prototype.splitBetween = function (n, e) {
            var r = this.findMinLMBetween(n, e);
            if (null !== r) {
              var i = t.split(r);
              return { constraint: r, lb: i[0], rb: i[1] };
            }
            return null;
          }),
          (t.prototype.mergeAcross = function (t, n, e) {
            n.active = !0;
            for (var r = 0, i = t.vars.length; r < i; ++r) {
              var o = t.vars[r];
              (o.offset += e), this.addVariable(o);
            }
            this.posn = this.ps.getPosn();
          }),
          (t.prototype.cost = function () {
            for (var t = 0, n = this.vars.length; n--; ) {
              var e = this.vars[n],
                r = e.position() - e.desiredPosition;
              t += r * r * e.weight;
            }
            return t;
          }),
          t
        );
      })();
      n.Block = s;
      var u = (function () {
        function t(t) {
          this.vs = t;
          var n = t.length;
          for (this.list = new Array(n); n--; ) {
            var e = new s(t[n]);
            (this.list[n] = e), (e.blockInd = n);
          }
        }
        return (
          (t.prototype.cost = function () {
            for (var t = 0, n = this.list.length; n--; )
              t += this.list[n].cost();
            return t;
          }),
          (t.prototype.insert = function (t) {
            (t.blockInd = this.list.length), this.list.push(t);
          }),
          (t.prototype.remove = function (t) {
            var n = this.list.length - 1,
              e = this.list[n];
            (this.list.length = n),
              t !== e &&
                ((this.list[t.blockInd] = e), (e.blockInd = t.blockInd));
          }),
          (t.prototype.merge = function (t) {
            var n = t.left.block,
              e = t.right.block,
              r = t.right.offset - t.left.offset - t.gap;
            n.vars.length < e.vars.length
              ? (e.mergeAcross(n, t, r), this.remove(n))
              : (n.mergeAcross(e, t, -r), this.remove(e));
          }),
          (t.prototype.forEach = function (t) {
            this.list.forEach(t);
          }),
          (t.prototype.updateBlockPositions = function () {
            this.list.forEach(function (t) {
              return t.updateWeightedPosition();
            });
          }),
          (t.prototype.split = function (t) {
            var n = this;
            this.updateBlockPositions(),
              this.list.forEach(function (e) {
                var r = e.findMinLM();
                null !== r &&
                  r.lm < a.LAGRANGIAN_TOLERANCE &&
                  ((e = r.left.block),
                  s.split(r).forEach(function (t) {
                    return n.insert(t);
                  }),
                  n.remove(e),
                  t.push(r));
              });
          }),
          t
        );
      })();
      n.Blocks = u;
      var a = (function () {
        function t(t, n) {
          (this.vs = t),
            (this.cs = n),
            (this.vs = t),
            t.forEach(function (t) {
              (t.cIn = []), (t.cOut = []);
            }),
            (this.cs = n),
            n.forEach(function (t) {
              t.left.cOut.push(t), t.right.cIn.push(t);
            }),
            (this.inactive = n.map(function (t) {
              return (t.active = !1), t;
            })),
            (this.bs = null);
        }
        return (
          (t.prototype.cost = function () {
            return this.bs.cost();
          }),
          (t.prototype.setStartingPositions = function (t) {
            (this.inactive = this.cs.map(function (t) {
              return (t.active = !1), t;
            })),
              (this.bs = new u(this.vs)),
              this.bs.forEach(function (n, e) {
                return (n.posn = t[e]);
              });
          }),
          (t.prototype.setDesiredPositions = function (t) {
            this.vs.forEach(function (n, e) {
              return (n.desiredPosition = t[e]);
            });
          }),
          (t.prototype.mostViolated = function () {
            for (
              var n = Number.MAX_VALUE,
                e = null,
                r = this.inactive,
                i = r.length,
                o = i,
                s = 0;
              s < i;
              ++s
            ) {
              var u = r[s];
              if (!u.unsatisfiable) {
                var a = u.slack();
                if (
                  (u.equality || a < n) &&
                  ((n = a), (e = u), (o = s), u.equality)
                )
                  break;
              }
            }
            return (
              o !== i &&
                ((n < t.ZERO_UPPERBOUND && !e.active) || e.equality) &&
                ((r[o] = r[i - 1]), (r.length = i - 1)),
              e
            );
          }),
          (t.prototype.satisfy = function () {
            null == this.bs && (this.bs = new u(this.vs)),
              this.bs.split(this.inactive);
            for (
              var n = null;
              (n = this.mostViolated()) &&
              (n.equality || (n.slack() < t.ZERO_UPPERBOUND && !n.active));

            ) {
              var e = n.left.block;
              if (e !== n.right.block) this.bs.merge(n);
              else {
                if (e.isActiveDirectedPathBetween(n.right, n.left)) {
                  n.unsatisfiable = !0;
                  continue;
                }
                var r = e.splitBetween(n.left, n.right);
                if (null === r) {
                  n.unsatisfiable = !0;
                  continue;
                }
                this.bs.insert(r.lb),
                  this.bs.insert(r.rb),
                  this.bs.remove(e),
                  this.inactive.push(r.constraint),
                  n.slack() >= 0 ? this.inactive.push(n) : this.bs.merge(n);
              }
            }
          }),
          (t.prototype.solve = function () {
            this.satisfy();
            for (
              var t = Number.MAX_VALUE, n = this.bs.cost();
              Math.abs(t - n) > 1e-4;

            )
              this.satisfy(), (t = n), (n = this.bs.cost());
            return n;
          }),
          (t.LAGRANGIAN_TOLERANCE = -1e-4),
          (t.ZERO_UPPERBOUND = -1e-10),
          t
        );
      })();
      (n.Solver = a),
        (n.removeOverlapInOneDimension = function (t, n, e) {
          for (
            var r = t.map(function (t) {
                return new o(t.desiredCenter);
              }),
              s = [],
              u = t.length,
              c = 0;
            c < u - 1;
            c++
          ) {
            var h = t[c],
              l = t[c + 1];
            s.push(new i(r[c], r[c + 1], (h.size + l.size) / 2));
          }
          var f = r[0],
            p = r[u - 1],
            d = t[0].size / 2,
            v = t[u - 1].size / 2,
            y = null,
            g = null;
          return (
            n &&
              ((y = new o(n, 1e3 * f.weight)),
              r.push(y),
              s.push(new i(y, f, d))),
            e &&
              ((g = new o(e, 1e3 * p.weight)),
              r.push(g),
              s.push(new i(p, g, v))),
            new a(r, s).solve(),
            {
              newCenters: r.slice(0, t.length).map(function (t) {
                return t.position();
              }),
              lowerBound: y ? y.position() : f.position() - d,
              upperBound: g ? g.position() : p.position() + v,
            }
          );
        });
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      const r = e(15);
      (n.version = r.version), (n.name = r.name);
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = (function () {
        return function (t, n, e) {
          (this.source = t), (this.target = n), (this.type = e);
        };
      })();
      n.PowerEdge = r;
      var i = (function () {
        function t(t, n, e, r) {
          var i = this;
          if (
            ((this.linkAccessor = e),
            (this.modules = new Array(t)),
            (this.roots = []),
            r)
          )
            this.initModulesFromGroup(r);
          else {
            this.roots.push(new u());
            for (var s = 0; s < t; ++s)
              this.roots[0].add((this.modules[s] = new o(s)));
          }
          (this.R = n.length),
            n.forEach(function (t) {
              var n = i.modules[e.getSourceIndex(t)],
                r = i.modules[e.getTargetIndex(t)],
                o = e.getType(t);
              n.outgoing.add(o, r), r.incoming.add(o, n);
            });
        }
        return (
          (t.prototype.initModulesFromGroup = function (t) {
            var n = new u();
            this.roots.push(n);
            for (var e = 0; e < t.leaves.length; ++e) {
              var r = t.leaves[e],
                i = new o(r.id);
              (this.modules[r.id] = i), n.add(i);
            }
            if (t.groups)
              for (var s = 0; s < t.groups.length; ++s) {
                var c = t.groups[s],
                  h = {};
                for (var l in c)
                  "leaves" !== l &&
                    "groups" !== l &&
                    c.hasOwnProperty(l) &&
                    (h[l] = c[l]);
                n.add(
                  new o(
                    -1 - s,
                    new a(),
                    new a(),
                    this.initModulesFromGroup(c),
                    h
                  )
                );
              }
            return n;
          }),
          (t.prototype.merge = function (t, n, e) {
            void 0 === e && (e = 0);
            var r = t.incoming.intersection(n.incoming),
              i = t.outgoing.intersection(n.outgoing),
              s = new u();
            s.add(t), s.add(n);
            var a = new o(this.modules.length, i, r, s);
            this.modules.push(a);
            var c = function (e, r, i) {
              e.forAll(function (e, o) {
                e.forAll(function (e) {
                  var s = e[r];
                  s.add(o, a),
                    s.remove(o, t),
                    s.remove(o, n),
                    t[i].remove(o, e),
                    n[i].remove(o, e);
                });
              });
            };
            return (
              c(i, "incoming", "outgoing"),
              c(r, "outgoing", "incoming"),
              (this.R -= r.count() + i.count()),
              this.roots[e].remove(t),
              this.roots[e].remove(n),
              this.roots[e].add(a),
              a
            );
          }),
          (t.prototype.rootMerges = function (t) {
            void 0 === t && (t = 0);
            for (
              var n = this.roots[t].modules(),
                e = n.length,
                r = new Array(e * (e - 1)),
                i = 0,
                o = 0,
                s = e - 1;
              o < s;
              ++o
            )
              for (var u = o + 1; u < e; ++u) {
                var a = n[o],
                  c = n[u];
                (r[i] = { id: i, nEdges: this.nEdges(a, c), a: a, b: c }), i++;
              }
            return r;
          }),
          (t.prototype.greedyMerge = function () {
            for (var t = 0; t < this.roots.length; ++t)
              if (!(this.roots[t].modules().length < 2)) {
                var n = this.rootMerges(t).sort(function (t, n) {
                  return t.nEdges == n.nEdges
                    ? t.id - n.id
                    : t.nEdges - n.nEdges;
                })[0];
                if (!(n.nEdges >= this.R)) return this.merge(n.a, n.b, t), !0;
              }
          }),
          (t.prototype.nEdges = function (t, n) {
            var e = t.incoming.intersection(n.incoming),
              r = t.outgoing.intersection(n.outgoing);
            return this.R - e.count() - r.count();
          }),
          (t.prototype.getGroupHierarchy = function (t) {
            var n = this,
              e = [];
            return (
              (function t(n, e, r) {
                n.forAll(function (n) {
                  if (n.isLeaf())
                    e.leaves || (e.leaves = []), e.leaves.push(n.id);
                  else {
                    var i = e;
                    if (
                      ((n.gid = r.length), !n.isIsland() || n.isPredefined())
                    ) {
                      if (((i = { id: n.gid }), n.isPredefined()))
                        for (var o in n.definition) i[o] = n.definition[o];
                      e.groups || (e.groups = []),
                        e.groups.push(n.gid),
                        r.push(i);
                    }
                    t(n.children, i, r);
                  }
                });
              })(this.roots[0], {}, e),
              this.allEdges().forEach(function (i) {
                var o = n.modules[i.source],
                  s = n.modules[i.target];
                t.push(
                  new r(
                    void 0 === o.gid ? i.source : e[o.gid],
                    void 0 === s.gid ? i.target : e[s.gid],
                    i.type
                  )
                );
              }),
              e
            );
          }),
          (t.prototype.allEdges = function () {
            var n = [];
            return t.getEdges(this.roots[0], n), n;
          }),
          (t.getEdges = function (n, e) {
            n.forAll(function (n) {
              n.getEdges(e), t.getEdges(n.children, e);
            });
          }),
          t
        );
      })();
      n.Configuration = i;
      var o = (function () {
        function t(t, n, e, r, i) {
          void 0 === n && (n = new a()),
            void 0 === e && (e = new a()),
            void 0 === r && (r = new u()),
            (this.id = t),
            (this.outgoing = n),
            (this.incoming = e),
            (this.children = r),
            (this.definition = i);
        }
        return (
          (t.prototype.getEdges = function (t) {
            var n = this;
            this.outgoing.forAll(function (e, i) {
              e.forAll(function (e) {
                t.push(new r(n.id, e.id, i));
              });
            });
          }),
          (t.prototype.isLeaf = function () {
            return 0 === this.children.count();
          }),
          (t.prototype.isIsland = function () {
            return 0 === this.outgoing.count() && 0 === this.incoming.count();
          }),
          (t.prototype.isPredefined = function () {
            return void 0 !== this.definition;
          }),
          t
        );
      })();
      function s(t, n) {
        var e = {};
        for (var r in t) r in n && (e[r] = t[r]);
        return e;
      }
      n.Module = o;
      var u = (function () {
        function t() {
          this.table = {};
        }
        return (
          (t.prototype.count = function () {
            return Object.keys(this.table).length;
          }),
          (t.prototype.intersection = function (n) {
            var e = new t();
            return (e.table = s(this.table, n.table)), e;
          }),
          (t.prototype.intersectionCount = function (t) {
            return this.intersection(t).count();
          }),
          (t.prototype.contains = function (t) {
            return t in this.table;
          }),
          (t.prototype.add = function (t) {
            this.table[t.id] = t;
          }),
          (t.prototype.remove = function (t) {
            delete this.table[t.id];
          }),
          (t.prototype.forAll = function (t) {
            for (var n in this.table) t(this.table[n]);
          }),
          (t.prototype.modules = function () {
            var t = [];
            return (
              this.forAll(function (n) {
                n.isPredefined() || t.push(n);
              }),
              t
            );
          }),
          t
        );
      })();
      n.ModuleSet = u;
      var a = (function () {
        function t() {
          (this.sets = {}), (this.n = 0);
        }
        return (
          (t.prototype.count = function () {
            return this.n;
          }),
          (t.prototype.contains = function (t) {
            var n = !1;
            return (
              this.forAllModules(function (e) {
                n || e.id != t || (n = !0);
              }),
              n
            );
          }),
          (t.prototype.add = function (t, n) {
            (t in this.sets ? this.sets[t] : (this.sets[t] = new u())).add(n),
              ++this.n;
          }),
          (t.prototype.remove = function (t, n) {
            var e = this.sets[t];
            e.remove(n), 0 === e.count() && delete this.sets[t], --this.n;
          }),
          (t.prototype.forAll = function (t) {
            for (var n in this.sets) t(this.sets[n], Number(n));
          }),
          (t.prototype.forAllModules = function (t) {
            this.forAll(function (n, e) {
              return n.forAll(t);
            });
          }),
          (t.prototype.intersection = function (n) {
            var e = new t();
            return (
              this.forAll(function (t, r) {
                if (r in n.sets) {
                  var i = t.intersection(n.sets[r]),
                    o = i.count();
                  o > 0 && ((e.sets[r] = i), (e.n += o));
                }
              }),
              e
            );
          }),
          t
        );
      })();
      (n.LinkSets = a),
        (n.getGroups = function (t, n, e, r) {
          for (var o = t.length, s = new i(o, n, e, r); s.greedyMerge(); );
          var u = [],
            a = s.getGroupHierarchy(u);
          return (
            u.forEach(function (n) {
              var e = function (e) {
                var r = n[e];
                "number" == typeof r && (n[e] = t[r]);
              };
              e("source"), e("target");
            }),
            { groups: a, powerEdges: u }
          );
        });
    },
    function (t, n, e) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, n) {
                t.__proto__ = n;
              }) ||
            function (t, n) {
              for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            }),
          function (t, n) {
            function e() {
              this.constructor = t;
            }
            r(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          });
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = (function () {
        function t() {
          this.findIter = function (t) {
            for (var n = this._root, e = this.iterator(); null !== n; ) {
              var r = this._comparator(t, n.data);
              if (0 === r) return (e._cursor = n), e;
              e._ancestors.push(n), (n = n.get_child(r > 0));
            }
            return null;
          };
        }
        return (
          (t.prototype.clear = function () {
            (this._root = null), (this.size = 0);
          }),
          (t.prototype.find = function (t) {
            for (var n = this._root; null !== n; ) {
              var e = this._comparator(t, n.data);
              if (0 === e) return n.data;
              n = n.get_child(e > 0);
            }
            return null;
          }),
          (t.prototype.lowerBound = function (t) {
            return this._bound(t, this._comparator);
          }),
          (t.prototype.upperBound = function (t) {
            var n = this._comparator;
            return this._bound(t, function (t, e) {
              return n(e, t);
            });
          }),
          (t.prototype.min = function () {
            var t = this._root;
            if (null === t) return null;
            for (; null !== t.left; ) t = t.left;
            return t.data;
          }),
          (t.prototype.max = function () {
            var t = this._root;
            if (null === t) return null;
            for (; null !== t.right; ) t = t.right;
            return t.data;
          }),
          (t.prototype.iterator = function () {
            return new s(this);
          }),
          (t.prototype.each = function (t) {
            for (var n, e = this.iterator(); null !== (n = e.next()); ) t(n);
          }),
          (t.prototype.reach = function (t) {
            for (var n, e = this.iterator(); null !== (n = e.prev()); ) t(n);
          }),
          (t.prototype._bound = function (t, n) {
            for (var e = this._root, r = this.iterator(); null !== e; ) {
              var i = this._comparator(t, e.data);
              if (0 === i) return (r._cursor = e), r;
              r._ancestors.push(e), (e = e.get_child(i > 0));
            }
            for (var o = r._ancestors.length - 1; o >= 0; --o)
              if (n(t, (e = r._ancestors[o]).data) > 0)
                return (r._cursor = e), (r._ancestors.length = o), r;
            return (r._ancestors.length = 0), r;
          }),
          t
        );
      })();
      n.TreeBase = o;
      var s = (function () {
        function t(t) {
          (this._tree = t), (this._ancestors = []), (this._cursor = null);
        }
        return (
          (t.prototype.data = function () {
            return null !== this._cursor ? this._cursor.data : null;
          }),
          (t.prototype.next = function () {
            if (null === this._cursor) {
              var t = this._tree._root;
              null !== t && this._minNode(t);
            } else {
              var n;
              if (null === this._cursor.right)
                do {
                  if (((n = this._cursor), !this._ancestors.length)) {
                    this._cursor = null;
                    break;
                  }
                  this._cursor = this._ancestors.pop();
                } while (this._cursor.right === n);
              else
                this._ancestors.push(this._cursor),
                  this._minNode(this._cursor.right);
            }
            return null !== this._cursor ? this._cursor.data : null;
          }),
          (t.prototype.prev = function () {
            if (null === this._cursor) {
              var t = this._tree._root;
              null !== t && this._maxNode(t);
            } else {
              var n;
              if (null === this._cursor.left)
                do {
                  if (((n = this._cursor), !this._ancestors.length)) {
                    this._cursor = null;
                    break;
                  }
                  this._cursor = this._ancestors.pop();
                } while (this._cursor.left === n);
              else
                this._ancestors.push(this._cursor),
                  this._maxNode(this._cursor.left);
            }
            return null !== this._cursor ? this._cursor.data : null;
          }),
          (t.prototype._minNode = function (t) {
            for (; null !== t.left; ) this._ancestors.push(t), (t = t.left);
            this._cursor = t;
          }),
          (t.prototype._maxNode = function (t) {
            for (; null !== t.right; ) this._ancestors.push(t), (t = t.right);
            this._cursor = t;
          }),
          t
        );
      })();
      n.Iterator = s;
      var u = (function () {
          function t(t) {
            (this.data = t),
              (this.left = null),
              (this.right = null),
              (this.red = !0);
          }
          return (
            (t.prototype.get_child = function (t) {
              return t ? this.right : this.left;
            }),
            (t.prototype.set_child = function (t, n) {
              t ? (this.right = n) : (this.left = n);
            }),
            t
          );
        })(),
        a = (function (t) {
          function n(n) {
            var e = t.call(this) || this;
            return (e._root = null), (e._comparator = n), (e.size = 0), e;
          }
          return (
            i(n, t),
            (n.prototype.insert = function (t) {
              var e = !1;
              if (null === this._root)
                (this._root = new u(t)), (e = !0), this.size++;
              else {
                var r = new u(void 0),
                  i = !1,
                  o = !1,
                  s = null,
                  a = r,
                  c = null,
                  h = this._root;
                for (a.right = this._root; ; ) {
                  if (
                    (null === h
                      ? ((h = new u(t)),
                        c.set_child(i, h),
                        (e = !0),
                        this.size++)
                      : n.is_red(h.left) &&
                        n.is_red(h.right) &&
                        ((h.red = !0), (h.left.red = !1), (h.right.red = !1)),
                    n.is_red(h) && n.is_red(c))
                  ) {
                    var l = a.right === s;
                    h === c.get_child(o)
                      ? a.set_child(l, n.single_rotate(s, !o))
                      : a.set_child(l, n.double_rotate(s, !o));
                  }
                  var f = this._comparator(h.data, t);
                  if (0 === f) break;
                  (o = i),
                    (i = f < 0),
                    null !== s && (a = s),
                    (s = c),
                    (c = h),
                    (h = h.get_child(i));
                }
                this._root = r.right;
              }
              return (this._root.red = !1), e;
            }),
            (n.prototype.remove = function (t) {
              if (null === this._root) return !1;
              var e = new u(void 0),
                r = e;
              r.right = this._root;
              for (
                var i = null, o = null, s = null, a = !0;
                null !== r.get_child(a);

              ) {
                var c = a;
                (o = i), (i = r), (r = r.get_child(a));
                var h = this._comparator(t, r.data);
                if (
                  ((a = h > 0),
                  0 === h && (s = r),
                  !n.is_red(r) && !n.is_red(r.get_child(a)))
                )
                  if (n.is_red(r.get_child(!a))) {
                    var l = n.single_rotate(r, a);
                    i.set_child(c, l), (i = l);
                  } else if (!n.is_red(r.get_child(!a))) {
                    var f = i.get_child(!c);
                    if (null !== f)
                      if (
                        n.is_red(f.get_child(!c)) ||
                        n.is_red(f.get_child(c))
                      ) {
                        var p = o.right === i;
                        n.is_red(f.get_child(c))
                          ? o.set_child(p, n.double_rotate(i, c))
                          : n.is_red(f.get_child(!c)) &&
                            o.set_child(p, n.single_rotate(i, c));
                        var d = o.get_child(p);
                        (d.red = !0),
                          (r.red = !0),
                          (d.left.red = !1),
                          (d.right.red = !1);
                      } else (i.red = !1), (f.red = !0), (r.red = !0);
                  }
              }
              return (
                null !== s &&
                  ((s.data = r.data),
                  i.set_child(i.right === r, r.get_child(null === r.left)),
                  this.size--),
                (this._root = e.right),
                null !== this._root && (this._root.red = !1),
                null !== s
              );
            }),
            (n.is_red = function (t) {
              return null !== t && t.red;
            }),
            (n.single_rotate = function (t, n) {
              var e = t.get_child(!n);
              return (
                t.set_child(!n, e.get_child(n)),
                e.set_child(n, t),
                (t.red = !0),
                (e.red = !1),
                e
              );
            }),
            (n.double_rotate = function (t, e) {
              return (
                t.set_child(!e, n.single_rotate(t.get_child(!e), !e)),
                n.single_rotate(t, e)
              );
            }),
            n
          );
        })(o);
      n.RBTree = a;
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = (function () {
        function t(t) {
          (this.elem = t), (this.subheaps = []);
        }
        return (
          (t.prototype.toString = function (t) {
            for (var n = "", e = !1, r = 0; r < this.subheaps.length; ++r) {
              var i = this.subheaps[r];
              i.elem
                ? (e && (n += ","), (n += i.toString(t)), (e = !0))
                : (e = !1);
            }
            return (
              "" !== n && (n = "(" + n + ")"),
              (this.elem ? t(this.elem) : "") + n
            );
          }),
          (t.prototype.forEach = function (t) {
            this.empty() ||
              (t(this.elem, this),
              this.subheaps.forEach(function (n) {
                return n.forEach(t);
              }));
          }),
          (t.prototype.count = function () {
            return this.empty()
              ? 0
              : 1 +
                  this.subheaps.reduce(function (t, n) {
                    return t + n.count();
                  }, 0);
          }),
          (t.prototype.min = function () {
            return this.elem;
          }),
          (t.prototype.empty = function () {
            return null == this.elem;
          }),
          (t.prototype.contains = function (t) {
            if (this === t) return !0;
            for (var n = 0; n < this.subheaps.length; n++)
              if (this.subheaps[n].contains(t)) return !0;
            return !1;
          }),
          (t.prototype.isHeap = function (t) {
            var n = this;
            return this.subheaps.every(function (e) {
              return t(n.elem, e.elem) && e.isHeap(t);
            });
          }),
          (t.prototype.insert = function (n, e) {
            return this.merge(new t(n), e);
          }),
          (t.prototype.merge = function (t, n) {
            return this.empty()
              ? t
              : t.empty()
              ? this
              : n(this.elem, t.elem)
              ? (this.subheaps.push(t), this)
              : (t.subheaps.push(this), t);
          }),
          (t.prototype.removeMin = function (t) {
            return this.empty() ? null : this.mergePairs(t);
          }),
          (t.prototype.mergePairs = function (n) {
            if (0 == this.subheaps.length) return new t(null);
            if (1 == this.subheaps.length) return this.subheaps[0];
            var e = this.subheaps.pop().merge(this.subheaps.pop(), n),
              r = this.mergePairs(n);
            return e.merge(r, n);
          }),
          (t.prototype.decreaseKey = function (n, e, r, i) {
            var o = n.removeMin(i);
            (n.elem = o.elem),
              (n.subheaps = o.subheaps),
              null !== r && null !== o.elem && r(n.elem, n);
            var s = new t(e);
            return null !== r && r(e, s), this.merge(s, i);
          }),
          t
        );
      })();
      n.PairingHeap = r;
      var i = (function () {
        function t(t) {
          this.lessThan = t;
        }
        return (
          (t.prototype.top = function () {
            return this.empty() ? null : this.root.elem;
          }),
          (t.prototype.push = function () {
            for (var t, n = [], e = 0; e < arguments.length; e++)
              n[e] = arguments[e];
            for (var i, o = 0; (i = n[o]); ++o)
              (t = new r(i)),
                (this.root = this.empty()
                  ? t
                  : this.root.merge(t, this.lessThan));
            return t;
          }),
          (t.prototype.empty = function () {
            return !this.root || !this.root.elem;
          }),
          (t.prototype.isHeap = function () {
            return this.root.isHeap(this.lessThan);
          }),
          (t.prototype.forEach = function (t) {
            this.root.forEach(t);
          }),
          (t.prototype.pop = function () {
            if (this.empty()) return null;
            var t = this.root.min();
            return (this.root = this.root.removeMin(this.lessThan)), t;
          }),
          (t.prototype.reduceKey = function (t, n, e) {
            void 0 === e && (e = null),
              (this.root = this.root.decreaseKey(t, n, e, this.lessThan));
          }),
          (t.prototype.toString = function (t) {
            return this.root.toString(t);
          }),
          (t.prototype.count = function () {
            return this.root.count();
          }),
          t
        );
      })();
      n.PriorityQueue = i;
    },
    function (t, n, e) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, n) {
                t.__proto__ = n;
              }) ||
            function (t, n) {
              for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            }),
          function (t, n) {
            function e() {
              this.constructor = t;
            }
            r(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          });
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = e(2),
        s = (function () {
          return function () {};
        })();
      n.Point = s;
      var u = (function () {
        return function (t, n, e, r) {
          (this.x1 = t), (this.y1 = n), (this.x2 = e), (this.y2 = r);
        };
      })();
      n.LineSegment = u;
      var a = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return i(n, t), n;
      })(s);
      function c(t, n, e) {
        return (n.x - t.x) * (e.y - t.y) - (e.x - t.x) * (n.y - t.y);
      }
      function h(t, n, e) {
        return c(t, n, e) > 0;
      }
      function l(t, n, e) {
        return c(t, n, e) < 0;
      }
      function f(t, n) {
        var e,
          r,
          i,
          o,
          s = n.length - 1;
        if (l(t, n[1], n[0]) && !h(t, n[s - 1], n[0])) return 0;
        for (e = 0, r = s; ; ) {
          if (r - e == 1) return h(t, n[e], n[r]) ? e : r;
          if (
            (o = l(t, n[(i = Math.floor((e + r) / 2)) + 1], n[i])) &&
            !h(t, n[i - 1], n[i])
          )
            return i;
          h(t, n[e + 1], n[e])
            ? o
              ? (r = i)
              : h(t, n[e], n[i])
              ? (r = i)
              : (e = i)
            : o && l(t, n[e], n[i])
            ? (r = i)
            : (e = i);
        }
      }
      function p(t, n) {
        var e,
          r,
          i,
          o,
          s = n.length - 1;
        if (h(t, n[s - 1], n[0]) && !l(t, n[1], n[0])) return 0;
        for (e = 0, r = s; ; ) {
          if (r - e == 1) return l(t, n[e], n[r]) ? e : r;
          if (
            ((o = l(t, n[(i = Math.floor((e + r) / 2)) + 1], n[i])),
            h(t, n[i - 1], n[i]) && !o)
          )
            return i;
          l(t, n[e + 1], n[e])
            ? o
              ? l(t, n[e], n[i])
                ? (r = i)
                : (e = i)
              : (r = i)
            : o
            ? (e = i)
            : h(t, n[e], n[i])
            ? (r = i)
            : (e = i);
        }
      }
      function d(t, n, e, r, i, o) {
        var s, u;
        u = r(t[(s = e(n[0], t))], n);
        for (var a = !1; !a; ) {
          for (
            a = !0;
            s === t.length - 1 && (s = 0), !i(n[u], t[s], t[s + 1]);

          )
            ++s;
          for (; 0 === u && (u = n.length - 1), !o(t[s], n[u], n[u - 1]); )
            --u, (a = !1);
        }
        return { t1: s, t2: u };
      }
      function v(t, n) {
        return d(t, n, f, p, h, l);
      }
      (n.PolyPoint = a),
        (n.isLeft = c),
        (n.ConvexHull = function (t) {
          var n,
            e = t.slice(0).sort(function (t, n) {
              return t.x !== n.x ? n.x - t.x : n.y - t.y;
            }),
            r = t.length,
            i = e[0].x;
          for (n = 1; n < r && e[n].x === i; ++n);
          var o = n - 1,
            s = [];
          if ((s.push(e[0]), o === r - 1)) e[o].y !== e[0].y && s.push(e[o]);
          else {
            var u,
              a = r - 1,
              h = e[r - 1].x;
            for (n = r - 2; n >= 0 && e[n].x === h; n--);
            for (u = n + 1, n = o; ++n <= u; )
              if (!(c(e[0], e[u], e[n]) >= 0 && n < u)) {
                for (
                  ;
                  s.length > 1 &&
                  !(c(s[s.length - 2], s[s.length - 1], e[n]) > 0);

                )
                  s.length -= 1;
                0 != n && s.push(e[n]);
              }
            a != u && s.push(e[a]);
            var l = s.length;
            for (n = u; --n >= o; )
              if (!(c(e[a], e[o], e[n]) >= 0 && n > o)) {
                for (
                  ;
                  s.length > l &&
                  !(c(s[s.length - 2], s[s.length - 1], e[n]) > 0);

                )
                  s.length -= 1;
                0 != n && s.push(e[n]);
              }
          }
          return s;
        }),
        (n.clockwiseRadialSweep = function (t, n, e) {
          n.slice(0)
            .sort(function (n, e) {
              return (
                Math.atan2(n.y - t.y, n.x - t.x) -
                Math.atan2(e.y - t.y, e.x - t.x)
              );
            })
            .forEach(e);
        }),
        (n.tangent_PolyPolyC = d),
        (n.LRtangent_PolyPolyC = function (t, n) {
          var e = v(n, t);
          return { t1: e.t2, t2: e.t1 };
        }),
        (n.RLtangent_PolyPolyC = v),
        (n.LLtangent_PolyPolyC = function (t, n) {
          return d(t, n, p, p, l, l);
        }),
        (n.RRtangent_PolyPolyC = function (t, n) {
          return d(t, n, f, f, h, h);
        });
      var y = (function () {
        return function (t, n) {
          (this.t1 = t), (this.t2 = n);
        };
      })();
      n.BiTangent = y;
      var g = (function () {
        return function () {};
      })();
      n.BiTangents = g;
      var _ = (function (t) {
        function n() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return i(n, t), n;
      })(s);
      n.TVGPoint = _;
      var m = (function () {
        return function (t, n, e, r) {
          (this.id = t),
            (this.polyid = n),
            (this.polyvertid = e),
            (this.p = r),
            (r.vv = this);
        };
      })();
      n.VisibilityVertex = m;
      var x = (function () {
        function t(t, n) {
          (this.source = t), (this.target = n);
        }
        return (
          (t.prototype.length = function () {
            var t = this.source.p.x - this.target.p.x,
              n = this.source.p.y - this.target.p.y;
            return Math.sqrt(t * t + n * n);
          }),
          t
        );
      })();
      n.VisibilityEdge = x;
      var b = (function () {
        function t(t, n) {
          if (((this.P = t), (this.V = []), (this.E = []), n))
            (this.V = n.V.slice(0)), (this.E = n.E.slice(0));
          else {
            for (var e = t.length, r = 0; r < e; r++) {
              for (var i = t[r], o = 0; o < i.length; ++o) {
                var s = i[o],
                  u = new m(this.V.length, r, o, s);
                this.V.push(u), o > 0 && this.E.push(new x(i[o - 1].vv, u));
              }
              i.length > 1 && this.E.push(new x(i[0].vv, i[i.length - 1].vv));
            }
            for (r = 0; r < e - 1; r++) {
              var a = t[r];
              for (o = r + 1; o < e; o++) {
                var c = t[o],
                  h = k(a, c);
                for (var l in h) {
                  var f = h[l],
                    p = a[f.t1],
                    d = c[f.t2];
                  this.addEdgeIfVisible(p, d, r, o);
                }
              }
            }
          }
        }
        return (
          (t.prototype.addEdgeIfVisible = function (t, n, e, r) {
            this.intersectsPolys(new u(t.x, t.y, n.x, n.y), e, r) ||
              this.E.push(new x(t.vv, n.vv));
          }),
          (t.prototype.addPoint = function (t, n) {
            var e,
              r,
              i,
              o = this.P.length;
            this.V.push(new m(this.V.length, o, 0, t));
            for (var s = 0; s < o; ++s)
              if (s !== n) {
                var u = this.P[s],
                  a =
                    ((e = t),
                    (i = void 0),
                    (i = (r = u).slice(0)).push(r[0]),
                    { rtan: f(e, i), ltan: p(e, i) });
                this.addEdgeIfVisible(t, u[a.ltan], n, s),
                  this.addEdgeIfVisible(t, u[a.rtan], n, s);
              }
            return t.vv;
          }),
          (t.prototype.intersectsPolys = function (t, n, e) {
            for (var r = 0, i = this.P.length; r < i; ++r)
              if (r != n && r != e && w(t, this.P[r]).length > 0) return !0;
            return !1;
          }),
          t
        );
      })();
      function w(t, n) {
        for (var e = [], r = 1, i = n.length; r < i; ++r) {
          var s = o.Rectangle.lineIntersection(
            t.x1,
            t.y1,
            t.x2,
            t.y2,
            n[r - 1].x,
            n[r - 1].y,
            n[r].x,
            n[r].y
          );
          s && e.push(s);
        }
        return e;
      }
      function k(t, n) {
        for (
          var e = t.length - 1, r = n.length - 1, i = new g(), o = 0;
          o < e;
          ++o
        )
          for (var s = 0; s < r; ++s) {
            var u = t[0 == o ? e - 1 : o - 1],
              a = t[o],
              h = t[o + 1],
              l = n[0 == s ? r - 1 : s - 1],
              f = n[s],
              p = n[s + 1],
              d = c(u, a, f),
              v = c(a, l, f),
              _ = c(a, f, p),
              m = c(l, f, a),
              x = c(f, u, a),
              b = c(f, a, h);
            d >= 0 && v >= 0 && _ < 0 && m >= 0 && x >= 0 && b < 0
              ? (i.ll = new y(o, s))
              : d <= 0 && v <= 0 && _ > 0 && m <= 0 && x <= 0 && b > 0
              ? (i.rr = new y(o, s))
              : d <= 0 && v > 0 && _ <= 0 && m >= 0 && x < 0 && b >= 0
              ? (i.rl = new y(o, s))
              : d >= 0 &&
                v < 0 &&
                _ >= 0 &&
                m <= 0 &&
                x > 0 &&
                b <= 0 &&
                (i.lr = new y(o, s));
          }
        return i;
      }
      function M(t, n) {
        return !t.every(function (t) {
          return !(function (t, n) {
            for (var e = 1, r = n.length; e < r; ++e)
              if (l(n[e - 1], n[e], t)) return !1;
            return !0;
          })(t, n);
        });
      }
      (n.TangentVisibilityGraph = b),
        (n.tangents = k),
        (n.polysOverlap = function (t, n) {
          if (M(t, n)) return !0;
          if (M(n, t)) return !0;
          for (var e = 1, r = t.length; e < r; ++e) {
            var i = t[e],
              o = t[e - 1];
            if (w(new u(o.x, o.y, i.x, i.y), n).length > 0) return !0;
          }
          return !1;
        });
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = {
        PADDING: 10,
        GOLDEN_SECTION: (1 + Math.sqrt(5)) / 2,
        FLOAT_EPSILON: 1e-4,
        MAX_INERATIONS: 100,
      };
      (n.applyPacking = function (t, n, e, i, o) {
        void 0 === o && (o = 1);
        var s = 0,
          u = 0,
          a = n,
          c = e,
          h = ((o = void 0 !== o ? o : 1), (i = void 0 !== i ? i : 0), 0),
          l = 0,
          f = 0,
          p = 0,
          d = [];
        function v(t, n) {
          (d = []), (h = 0), (l = 0), (p = u);
          for (var e = 0; e < t.length; e++) y(t[e], n);
          return Math.abs(h / l - o);
        }
        function y(t, n) {
          for (var e = void 0, i = 0; i < d.length; i++)
            if (
              d[i].space_left >= t.height &&
              d[i].x + d[i].width + t.width + r.PADDING - n <= r.FLOAT_EPSILON
            ) {
              e = d[i];
              break;
            }
          d.push(t),
            void 0 !== e
              ? ((t.x = e.x + e.width + r.PADDING),
                (t.y = e.bottom),
                (t.space_left = t.height),
                (t.bottom = t.y),
                (e.space_left -= t.height + r.PADDING),
                (e.bottom += t.height + r.PADDING))
              : ((t.y = p),
                (p += t.height + r.PADDING),
                (t.x = s),
                (t.bottom = t.y),
                (t.space_left = t.height)),
            t.y + t.height - l > -r.FLOAT_EPSILON && (l = t.y + t.height - u),
            t.x + t.width - h > -r.FLOAT_EPSILON && (h = t.x + t.width - s);
        }
        0 != t.length &&
          ((function (t) {
            t.forEach(function (t) {
              var n, e, r, o, s;
              (n = t),
                (e = Number.MAX_VALUE),
                (r = Number.MAX_VALUE),
                (o = 0),
                (s = 0),
                n.array.forEach(function (t) {
                  var n = void 0 !== t.width ? t.width : i,
                    u = void 0 !== t.height ? t.height : i;
                  (n /= 2),
                    (u /= 2),
                    (o = Math.max(t.x + n, o)),
                    (e = Math.min(t.x - n, e)),
                    (s = Math.max(t.y + u, s)),
                    (r = Math.min(t.y - u, r));
                }),
                (n.width = o - e),
                (n.height = s - r);
            });
          })(t),
          (function (t, n) {
            var e = Number.POSITIVE_INFINITY,
              i = 0;
            t.sort(function (t, n) {
              return n.height - t.height;
            }),
              (f = t.reduce(function (t, n) {
                return t.width < n.width ? t.width : n.width;
              }));
            for (
              var o = (d = f),
                s = (y = (function (t) {
                  var n = 0;
                  return (
                    t.forEach(function (t) {
                      return (n += t.width + r.PADDING);
                    }),
                    n
                  );
                })(t)),
                u = 0,
                a = Number.MAX_VALUE,
                c = Number.MAX_VALUE,
                h = -1,
                l = Number.MAX_VALUE,
                p = Number.MAX_VALUE;
              l > f || p > r.FLOAT_EPSILON;

            ) {
              if (1 != h)
                var d = s - (s - o) / r.GOLDEN_SECTION,
                  a = v(t, d);
              if (0 != h)
                var y = o + (s - o) / r.GOLDEN_SECTION,
                  c = v(t, y);
              if (
                ((l = Math.abs(d - y)),
                (p = Math.abs(a - c)),
                a < e && ((e = a), (i = d)),
                c < e && ((e = c), (i = y)),
                a > c
                  ? ((o = d), (d = y), (a = c), (h = 1))
                  : ((s = y), (y = d), (c = a), (h = 0)),
                u++ > 100)
              )
                break;
            }
            v(t, i);
          })(t),
          (function (t) {
            t.forEach(function (t) {
              var n = { x: 0, y: 0 };
              t.array.forEach(function (t) {
                (n.x += t.x), (n.y += t.y);
              }),
                (n.x /= t.array.length),
                (n.y /= t.array.length);
              var e = { x: n.x - t.width / 2, y: n.y - t.height / 2 },
                r = {
                  x: t.x - e.x + a / 2 - h / 2,
                  y: t.y - e.y + c / 2 - l / 2,
                };
              t.array.forEach(function (t) {
                (t.x += r.x), (t.y += r.y);
              });
            });
          })(t));
      }),
        (n.separateGraphs = function (t, n) {
          for (var e = {}, r = {}, i = [], o = 0, s = 0; s < n.length; s++) {
            var u = n[s],
              a = u.source,
              c = u.target;
            r[a.index] ? r[a.index].push(c) : (r[a.index] = [c]),
              r[c.index] ? r[c.index].push(a) : (r[c.index] = [a]);
          }
          for (s = 0; s < t.length; s++) {
            var h = t[s];
            e[h.index] || l(h, !0);
          }
          function l(t, n) {
            if (void 0 === e[t.index]) {
              n && (o++, i.push({ array: [] })),
                (e[t.index] = o),
                i[o - 1].array.push(t);
              var s = r[t.index];
              if (s) for (var u = 0; u < s.length; u++) l(s[u], !1);
            }
          }
          return i;
        });
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(2),
        i = e(6),
        o = e(3),
        s = (function () {
          return function (t, n, e) {
            (this.id = t),
              (this.rect = n),
              (this.children = e),
              (this.leaf = void 0 === e || 0 === e.length);
          };
        })();
      n.NodeWrapper = s;
      var u = (function () {
        return function (t, n, e, r, i) {
          void 0 === r && (r = null),
            void 0 === i && (i = null),
            (this.id = t),
            (this.x = n),
            (this.y = e),
            (this.node = r),
            (this.line = i);
        };
      })();
      n.Vert = u;
      var a = (function () {
        function t(n, e) {
          (this.s = n), (this.t = e);
          var r = t.findMatch(n, e),
            i = e.slice(0).reverse(),
            o = t.findMatch(n, i);
          r.length >= o.length
            ? ((this.length = r.length),
              (this.si = r.si),
              (this.ti = r.ti),
              (this.reversed = !1))
            : ((this.length = o.length),
              (this.si = o.si),
              (this.ti = e.length - o.ti - o.length),
              (this.reversed = !0));
        }
        return (
          (t.findMatch = function (t, n) {
            for (
              var e = t.length,
                r = n.length,
                i = { length: 0, si: -1, ti: -1 },
                o = new Array(e),
                s = 0;
              s < e;
              s++
            ) {
              o[s] = new Array(r);
              for (var u = 0; u < r; u++)
                if (t[s] === n[u]) {
                  var a = (o[s][u] =
                    0 === s || 0 === u ? 1 : o[s - 1][u - 1] + 1);
                  a > i.length &&
                    ((i.length = a), (i.si = s - a + 1), (i.ti = u - a + 1));
                } else o[s][u] = 0;
            }
            return i;
          }),
          (t.prototype.getSequence = function () {
            return this.length >= 0
              ? this.s.slice(this.si, this.si + this.length)
              : [];
          }),
          t
        );
      })();
      n.LongestCommonSubsequence = a;
      var c = (function () {
        function t(t, n, e) {
          void 0 === e && (e = 12);
          var i = this;
          (this.originalnodes = t),
            (this.groupPadding = e),
            (this.leaves = null),
            (this.nodes = t.map(function (t, e) {
              return new s(e, n.getBounds(t), n.getChildren(t));
            })),
            (this.leaves = this.nodes.filter(function (t) {
              return t.leaf;
            })),
            (this.groups = this.nodes.filter(function (t) {
              return !t.leaf;
            })),
            (this.cols = this.getGridLines("x")),
            (this.rows = this.getGridLines("y")),
            this.groups.forEach(function (t) {
              return t.children.forEach(function (n) {
                return (i.nodes[n].parent = t);
              });
            }),
            (this.root = { children: [] }),
            this.nodes.forEach(function (t) {
              void 0 === t.parent &&
                ((t.parent = i.root), i.root.children.push(t.id)),
                (t.ports = []);
            }),
            (this.backToFront = this.nodes.slice(0)),
            this.backToFront.sort(function (t, n) {
              return i.getDepth(t) - i.getDepth(n);
            }),
            this.backToFront
              .slice(0)
              .reverse()
              .filter(function (t) {
                return !t.leaf;
              })
              .forEach(function (t) {
                var n = r.Rectangle.empty();
                t.children.forEach(function (t) {
                  return (n = n.union(i.nodes[t].rect));
                }),
                  (t.rect = n.inflate(i.groupPadding));
              });
          var o = this.midPoints(
              this.cols.map(function (t) {
                return t.pos;
              })
            ),
            a = this.midPoints(
              this.rows.map(function (t) {
                return t.pos;
              })
            ),
            c = o[0],
            h = o[o.length - 1],
            l = a[0],
            f = a[a.length - 1],
            p = this.rows
              .map(function (t) {
                return { x1: c, x2: h, y1: t.pos, y2: t.pos };
              })
              .concat(
                a.map(function (t) {
                  return { x1: c, x2: h, y1: t, y2: t };
                })
              ),
            d = this.cols
              .map(function (t) {
                return { x1: t.pos, x2: t.pos, y1: l, y2: f };
              })
              .concat(
                o.map(function (t) {
                  return { x1: t, x2: t, y1: l, y2: f };
                })
              ),
            v = p.concat(d);
          v.forEach(function (t) {
            return (t.verts = []);
          }),
            (this.verts = []),
            (this.edges = []),
            p.forEach(function (t) {
              return d.forEach(function (n) {
                var e = new u(i.verts.length, n.x1, t.y1);
                t.verts.push(e), n.verts.push(e), i.verts.push(e);
                for (var r = i.backToFront.length; r-- > 0; ) {
                  var o = i.backToFront[r],
                    s = o.rect,
                    a = Math.abs(e.x - s.cx()),
                    c = Math.abs(e.y - s.cy());
                  if (a < s.width() / 2 && c < s.height() / 2) {
                    e.node = o;
                    break;
                  }
                }
              });
            }),
            v.forEach(function (t, n) {
              i.nodes.forEach(function (n, e) {
                n.rect
                  .lineIntersections(t.x1, t.y1, t.x2, t.y2)
                  .forEach(function (e, r) {
                    var o = new u(i.verts.length, e.x, e.y, n, t);
                    i.verts.push(o), t.verts.push(o), n.ports.push(o);
                  });
              });
              var e = Math.abs(t.y1 - t.y2) < 0.1,
                r = function (t, n) {
                  return e ? n.x - t.x : n.y - t.y;
                };
              t.verts.sort(r);
              for (var o = 1; o < t.verts.length; o++) {
                var s = t.verts[o - 1],
                  a = t.verts[o];
                (s.node && s.node === a.node && s.node.leaf) ||
                  i.edges.push({
                    source: s.id,
                    target: a.id,
                    length: Math.abs(r(s, a)),
                  });
              }
            });
        }
        return (
          (t.prototype.avg = function (t) {
            return (
              t.reduce(function (t, n) {
                return t + n;
              }) / t.length
            );
          }),
          (t.prototype.getGridLines = function (t) {
            for (
              var n = [], e = this.leaves.slice(0, this.leaves.length);
              e.length > 0;

            ) {
              var r = e.filter(function (n) {
                  return n.rect["overlap" + t.toUpperCase()](e[0].rect);
                }),
                i = {
                  nodes: r,
                  pos: this.avg(
                    r.map(function (n) {
                      return n.rect["c" + t]();
                    })
                  ),
                };
              n.push(i),
                i.nodes.forEach(function (t) {
                  return e.splice(e.indexOf(t), 1);
                });
            }
            return (
              n.sort(function (t, n) {
                return t.pos - n.pos;
              }),
              n
            );
          }),
          (t.prototype.getDepth = function (t) {
            for (var n = 0; t.parent !== this.root; ) n++, (t = t.parent);
            return n;
          }),
          (t.prototype.midPoints = function (t) {
            for (
              var n = t[1] - t[0], e = [t[0] - n / 2], r = 1;
              r < t.length;
              r++
            )
              e.push((t[r] + t[r - 1]) / 2);
            return e.push(t[t.length - 1] + n / 2), e;
          }),
          (t.prototype.findLineage = function (t) {
            var n = [t];
            do {
              (t = t.parent), n.push(t);
            } while (t !== this.root);
            return n.reverse();
          }),
          (t.prototype.findAncestorPathBetween = function (t, n) {
            for (
              var e = this.findLineage(t), r = this.findLineage(n), i = 0;
              e[i] === r[i];

            )
              i++;
            return {
              commonAncestor: e[i - 1],
              lineages: e.slice(i).concat(r.slice(i)),
            };
          }),
          (t.prototype.siblingObstacles = function (t, n) {
            var e = this,
              r = this.findAncestorPathBetween(t, n),
              i = {};
            r.lineages.forEach(function (t) {
              return (i[t.id] = {});
            });
            var o = r.commonAncestor.children.filter(function (t) {
              return !(t in i);
            });
            return (
              r.lineages
                .filter(function (t) {
                  return t.parent !== r.commonAncestor;
                })
                .forEach(function (t) {
                  return (o = o.concat(
                    t.parent.children.filter(function (n) {
                      return n !== t.id;
                    })
                  ));
                }),
              o.map(function (t) {
                return e.nodes[t];
              })
            );
          }),
          (t.getSegmentSets = function (t, n, e) {
            for (var r = [], i = 0; i < t.length; i++)
              for (var o = t[i], s = 0; s < o.length; s++) {
                ((l = o[s]).edgeid = i), (l.i = s);
                var u = l[1][n] - l[0][n];
                Math.abs(u) < 0.1 && r.push(l);
              }
            r.sort(function (t, e) {
              return t[0][n] - e[0][n];
            });
            for (var a = [], c = null, h = 0; h < r.length; h++) {
              var l = r[h];
              (!c || Math.abs(l[0][n] - c.pos) > 0.1) &&
                ((c = { pos: l[0][n], segments: [] }), a.push(c)),
                c.segments.push(l);
            }
            return a;
          }),
          (t.nudgeSegs = function (t, n, e, r, o, s) {
            var u = r.length;
            if (!(u <= 1)) {
              for (
                var a = r.map(function (n) {
                    return new i.Variable(n[0][t]);
                  }),
                  c = [],
                  h = 0;
                h < u;
                h++
              )
                for (var l = 0; l < u; l++)
                  if (h !== l) {
                    var f = r[h],
                      p = r[l],
                      d = f.edgeid,
                      v = p.edgeid,
                      y = -1,
                      g = -1;
                    "x" == t
                      ? o(d, v) &&
                        (f[0][n] < f[1][n]
                          ? ((y = l), (g = h))
                          : ((y = h), (g = l)))
                      : o(d, v) &&
                        (f[0][n] < f[1][n]
                          ? ((y = h), (g = l))
                          : ((y = l), (g = h))),
                      y >= 0 && c.push(new i.Constraint(a[y], a[g], s));
                  }
              new i.Solver(a, c).solve(),
                a.forEach(function (n, i) {
                  var o = r[i],
                    s = n.position();
                  o[0][t] = o[1][t] = s;
                  var u = e[o.edgeid];
                  o.i > 0 && (u[o.i - 1][1][t] = s),
                    o.i < u.length - 1 && (u[o.i + 1][0][t] = s);
                });
            }
          }),
          (t.nudgeSegments = function (n, e, r, i, o) {
            for (var s = t.getSegmentSets(n, e, r), u = 0; u < s.length; u++) {
              for (var a = s[u], c = [], h = 0; h < a.segments.length; h++) {
                var l = a.segments[h];
                c.push({ type: 0, s: l, pos: Math.min(l[0][r], l[1][r]) }),
                  c.push({ type: 1, s: l, pos: Math.max(l[0][r], l[1][r]) });
              }
              c.sort(function (t, n) {
                return t.pos - n.pos + t.type - n.type;
              });
              var f = [],
                p = 0;
              c.forEach(function (s) {
                0 === s.type ? (f.push(s.s), p++) : p--,
                  0 == p && (t.nudgeSegs(e, r, n, f, i, o), (f = []));
              });
            }
          }),
          (t.prototype.routeEdges = function (n, e, r, i) {
            var o = this,
              s = n.map(function (t) {
                return o.route(r(t), i(t));
              }),
              u = t.orderEdges(s),
              a = s.map(function (n) {
                return t.makeSegments(n);
              });
            return (
              t.nudgeSegments(a, "x", "y", u, e),
              t.nudgeSegments(a, "y", "x", u, e),
              t.unreverseEdges(a, s),
              a
            );
          }),
          (t.unreverseEdges = function (t, n) {
            t.forEach(function (t, e) {
              n[e].reversed &&
                (t.reverse(),
                t.forEach(function (t) {
                  t.reverse();
                }));
            });
          }),
          (t.angleBetween2Lines = function (t, n) {
            var e = Math.atan2(t[0].y - t[1].y, t[0].x - t[1].x),
              r = Math.atan2(n[0].y - n[1].y, n[0].x - n[1].x),
              i = e - r;
            return (i > Math.PI || i < -Math.PI) && (i = r - e), i;
          }),
          (t.isLeft = function (t, n, e) {
            return (n.x - t.x) * (e.y - t.y) - (n.y - t.y) * (e.x - t.x) <= 0;
          }),
          (t.getOrder = function (t) {
            for (var n = {}, e = 0; e < t.length; e++) {
              var r = t[e];
              void 0 === n[r.l] && (n[r.l] = {}), (n[r.l][r.r] = !0);
            }
            return function (t, e) {
              return void 0 !== n[t] && n[t][e];
            };
          }),
          (t.orderEdges = function (n) {
            for (var e = [], r = 0; r < n.length - 1; r++)
              for (var i = r + 1; i < n.length; i++) {
                var o,
                  s,
                  u,
                  c = n[r],
                  h = n[i],
                  l = new a(c, h);
                0 !== l.length &&
                  (l.reversed &&
                    (h.reverse(), (h.reversed = !0), (l = new a(c, h))),
                  (l.si <= 0 || l.ti <= 0) &&
                  (l.si + l.length >= c.length || l.ti + l.length >= h.length)
                    ? e.push({ l: r, r: i })
                    : (l.si + l.length >= c.length ||
                      l.ti + l.length >= h.length
                        ? ((o = c[l.si + 1]),
                          (u = c[l.si - 1]),
                          (s = h[l.ti - 1]))
                        : ((o = c[l.si + l.length - 2]),
                          (s = c[l.si + l.length]),
                          (u = h[l.ti + l.length])),
                      t.isLeft(o, s, u)
                        ? e.push({ l: i, r: r })
                        : e.push({ l: r, r: i })));
              }
            return t.getOrder(e);
          }),
          (t.makeSegments = function (t) {
            function n(t) {
              return { x: t.x, y: t.y };
            }
            for (
              var e = function (t, n, e) {
                  return (
                    Math.abs(
                      (n.x - t.x) * (e.y - t.y) - (n.y - t.y) * (e.x - t.x)
                    ) < 0.001
                  );
                },
                r = [],
                i = n(t[0]),
                o = 1;
              o < t.length;
              o++
            ) {
              var s = n(t[o]),
                u = o < t.length - 1 ? t[o + 1] : null;
              (u && e(i, s, u)) || (r.push([i, s]), (i = s));
            }
            return r;
          }),
          (t.prototype.route = function (t, n) {
            var e = this,
              r = this.nodes[t],
              i = this.nodes[n];
            this.obstacles = this.siblingObstacles(r, i);
            var s = {};
            this.obstacles.forEach(function (t) {
              return (s[t.id] = t);
            }),
              (this.passableEdges = this.edges.filter(function (t) {
                var n = e.verts[t.source],
                  r = e.verts[t.target];
                return !(
                  (n.node && n.node.id in s) ||
                  (r.node && r.node.id in s)
                );
              }));
            for (var u = 1; u < r.ports.length; u++) {
              var a = r.ports[0].id,
                c = r.ports[u].id;
              this.passableEdges.push({ source: a, target: c, length: 0 });
            }
            for (u = 1; u < i.ports.length; u++) {
              (a = i.ports[0].id), (c = i.ports[u].id);
              this.passableEdges.push({ source: a, target: c, length: 0 });
            }
            var h = new o.Calculator(
              this.verts.length,
              this.passableEdges,
              function (t) {
                return t.source;
              },
              function (t) {
                return t.target;
              },
              function (t) {
                return t.length;
              }
            )
              .PathFromNodeToNodeWithPrevCost(
                r.ports[0].id,
                i.ports[0].id,
                function (t, n, o) {
                  var s = e.verts[t],
                    u = e.verts[n],
                    a = e.verts[o],
                    c = Math.abs(a.x - s.x),
                    h = Math.abs(a.y - s.y);
                  return (s.node === r && s.node === u.node) ||
                    (u.node === i && u.node === a.node)
                    ? 0
                    : c > 1 && h > 1
                    ? 1e3
                    : 0;
                }
              )
              .reverse()
              .map(function (t) {
                return e.verts[t];
              });
            return (
              h.push(this.nodes[i.id].ports[0]),
              h.filter(function (t, n) {
                return !(
                  (n < h.length - 1 && h[n + 1].node === r && t.node === r) ||
                  (n > 0 && t.node === i && h[n - 1].node === i)
                );
              })
            );
          }),
          (t.getRoutePath = function (n, e, r, i) {
            var o = {
              routepath: "M " + n[0][0].x + " " + n[0][0].y + " ",
              arrowpath: "",
            };
            if (n.length > 1)
              for (var s = 0; s < n.length; s++) {
                var u = (x = n[s])[1].x,
                  a = x[1].y,
                  c = u - x[0].x,
                  h = a - x[0].y;
                if (s < n.length - 1) {
                  Math.abs(c) > 0
                    ? (u -= (c / Math.abs(c)) * e)
                    : (a -= (h / Math.abs(h)) * e),
                    (o.routepath += "L " + u + " " + a + " ");
                  var l = n[s + 1],
                    f = l[0].x,
                    p = l[0].y;
                  (c = l[1].x - f), (h = l[1].y - p);
                  var d,
                    v,
                    y = t.angleBetween2Lines(x, l) < 0 ? 1 : 0;
                  Math.abs(c) > 0
                    ? ((d = f + (c / Math.abs(c)) * e), (v = p))
                    : ((d = f), (v = p + (h / Math.abs(h)) * e));
                  var g = Math.abs(d - u),
                    _ = Math.abs(v - a);
                  o.routepath +=
                    "A " + g + " " + _ + " 0 0 " + y + " " + d + " " + v + " ";
                } else {
                  var m = [u, a];
                  Math.abs(c) > 0
                    ? ((b = [(u -= (c / Math.abs(c)) * i), a + r]),
                      (w = [u, a - r]))
                    : ((b = [u + r, (a -= (h / Math.abs(h)) * i)]),
                      (w = [u - r, a])),
                    (o.routepath += "L " + u + " " + a + " "),
                    i > 0 &&
                      (o.arrowpath =
                        "M " +
                        m[0] +
                        " " +
                        m[1] +
                        " L " +
                        b[0] +
                        " " +
                        b[1] +
                        " L " +
                        w[0] +
                        " " +
                        w[1]);
                }
              }
            else {
              var x, b, w;
              (u = (x = n[0])[1].x),
                (a = x[1].y),
                (c = u - x[0].x),
                (h = a - x[0].y),
                (m = [u, a]);
              Math.abs(c) > 0
                ? ((b = [(u -= (c / Math.abs(c)) * i), a + r]),
                  (w = [u, a - r]))
                : ((b = [u + r, (a -= (h / Math.abs(h)) * i)]),
                  (w = [u - r, a])),
                (o.routepath += "L " + u + " " + a + " "),
                i > 0 &&
                  (o.arrowpath =
                    "M " +
                    m[0] +
                    " " +
                    m[1] +
                    " L " +
                    b[0] +
                    " " +
                    b[1] +
                    " L " +
                    w[0] +
                    " " +
                    w[1]);
            }
            return o;
          }),
          t
        );
      })();
      n.GridRouter = c;
    },
    function (t, n, e) {
      "use strict";
      function r(t) {
        for (var e in t) n.hasOwnProperty(e) || (n[e] = t[e]);
      }
      Object.defineProperty(n, "__esModule", { value: !0 }), r(e(7)), r(e(16));
    },
    function (t) {
      t.exports = {
        name: "algorithmx-jupyter",
        version: "2.1.0",
        main: "dist/index.js",
        types: "./dist/types/index.d.ts",
        files: ["dist/", "dist-lab/"],
        unpkg: "dist/index.js",
        homepage: "https://github.com/algrx/algorithmx-python",
        license: "MIT",
        author: { name: "Alex Socha" },
        description: "AlgorithmX Jupyter widget.",
        keywords: [
          "jupyter",
          "jupyterlab",
          "jupyterlab-extension",
          "widgets",
          "algorithmx",
        ],
        repository: {
          type: "git",
          url: "https://github.com/algrx/algorithmx-python",
        },
        scripts: {
          build: "npm run build:nbextension && npm run build:labextension",
          "build:nbextension":
            "NODE_OPTIONS=--max_old_space_size=1000 webpack -p",
          "build:labextension":
            "mkdir -p dist/labextension && cd dist/labextension && npm pack ../..",
          clean: "rimraf dist && rimraf",
          "clean:nbextension":
            "rimraf ../algorithmx/nbextension/static && rimraf dist/",
          "clean:labextension":
            "rimraf ../algorithmx/labextension && rimraf dist-lab/",
          watch: "webpack --watch",
          prepublishOnly: "npm run build",
        },
        dependencies: {
          "@jupyter-widgets/base": "^1.1.10",
          algorithmx: "^1.1.2",
          "d3-color": "^1.0.0",
          "d3-dispatch": "^1.0.0",
          "d3-drag": "^1.0.0",
          "d3-ease": "^1.0.0",
          "d3-interpolate": "^1.0.0",
          "d3-path": "^1.0.0",
          "d3-selection": "^1.0.0",
          "d3-shape": "^1.0.0",
          "d3-timer": "^1.0.0",
          "d3-transition": "^1.0.0",
          "d3-zoom": "^1.0.0",
          webcola: "^3.0.0",
        },
        devDependencies: {
          "@phosphor/application": "^1.6.0",
          "@phosphor/widgets": "^1.6.0",
          "@types/node": "^10.11.6",
          "@types/webpack-env": "^1.13.6",
          "fs-extra": "^7.0.0",
          mkdirp: "^0.5.1",
          "npm-run-all": "^4.1.3",
          rimraf: "^2.6.2",
          "source-map-loader": "^0.2.4",
          "ts-loader": "^5.2.1",
          typescript: "^3.5.3",
          webpack: "^4.20.2",
          "webpack-cli": "^3.1.2",
        },
        jupyterlab: { extension: "dist/jupyter-lab/labplugin" },
      };
    },
    function (t, n, e) {
      "use strict";
      var r =
        (this && this.__importStar) ||
        function (t) {
          if (t && t.__esModule) return t;
          var n = {};
          if (null != t)
            for (var e in t) Object.hasOwnProperty.call(t, e) && (n[e] = t[e]);
          return (n.default = t), n;
        };
      Object.defineProperty(n, "__esModule", { value: !0 });
      const i = e(17),
        o = e(7),
        s = r(e(18)),
        u = r(e(25));
      class a extends i.DOMWidgetModel {
        defaults() {
          return Object.assign({}, super.defaults(), {
            _model_name: "AlgorithmxModel",
            _model_module: o.name,
            _model_module_version: o.version,
            _view_name: "AlgorithmxView",
            _view_module: o.name,
            _view_module_version: o.version,
            events: [],
            show_buttons: !1,
          });
        }
      }
      (a.serializers = Object.assign({}, i.DOMWidgetModel.serializers)),
        (n.AlgorithmxModel = a);
      n.AlgorithmxView = class extends i.DOMWidgetView {
        constructor() {
          super(...arguments),
            (this.client = null),
            (this.canvas = null),
            (this.eventIndex = 0),
            (this.stopped = !1);
        }
        playEvents(t) {
          null !== this.client &&
            t.forEach((t) => {
              const n = JSON.parse(t);
              this.client.dispatch(n);
            });
        }
        playAllEvents() {
          const t = this.model.get("events");
          this.playEvents(t);
        }
        eventsChanged() {
          if (null === this.client) return;
          const t = this.model.get("events"),
            n = t.slice(this.eventIndex);
          (this.eventIndex = t.length), this.playEvents(n);
        }
        resetCanvas() {
          if (null === this.canvas) return;
          const t = this.canvas.eventQ(null).duration(0);
          t.cancelall().startall(),
            t.remove(),
            t.add().size([400, 250]).zoomkey(!0),
            setTimeout(() => {
              t.svgattr("width", "100%");
            }, 1);
        }
        removeCanvas() {
          this.resetCanvas();
          const t = this.el,
            n = t.querySelector("algorithmx-container");
          null !== n && t.removeChild(n);
          const e = t.querySelector("algorithmx-buttons");
          null !== e && t.removeChild(e);
        }
        remove() {
          this.removeCanvas(), super.remove();
        }
        clickRestart() {
          null !== this.canvas &&
            (this.resetCanvas(), this.playAllEvents(), (this.stopped = !1));
        }
        clickStart() {
          null !== this.canvas &&
            (this.canvas.eventQ(null).startall(), (this.stopped = !1));
        }
        clickStop() {
          null !== this.canvas &&
            (this.canvas.eventQ(null).stopall(), (this.stopped = !0));
        }
        renderButtons() {
          const t = this.el,
            n = document.createElement("div");
          n.style.height = "40px";
          const e = s.createButton("pause", () => {
              this.stopped
                ? (s.setIcon(e, "pause"), this.clickStart())
                : (s.setIcon(e, "play"), this.clickStop());
            }),
            r = s.createButton("repeat", () => {
              s.setIcon(e, "pause"), this.clickRestart();
            });
          n.appendChild(e), n.appendChild(r), t.appendChild(n);
        }
        render() {
          this.removeCanvas();
          const t = document.createElement("div");
          t.setAttribute("id", "algorithmx-container"),
            (this.client = u.client(t)),
            this.client.subscribe((t) => {
              const n = { source: "algorithmx", data: t },
                e = JSON.stringify(n);
              this.send(e);
            }),
            (this.canvas = this.client.canvas()),
            this.resetCanvas(),
            this.el.appendChild(t),
            this.model.get("show_buttons") && this.renderButtons(),
            this.model.on("change:events", this.eventsChanged, this),
            this.eventsChanged();
        }
      };
    },
    function (n, e) {
      n.exports = t;
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      (n.createButton = (t, e) => {
        const r = document.createElement("div");
        n.createButton,
          (r.onclick = e),
          (r.style.width = "28px"),
          (r.style.height = "28px"),
          (r.style.backgroundColor = "rgb(238, 238, 238)"),
          (r.style.display = "inline-block"),
          (r.style.textAlign = "center"),
          (r.style.marginRight = "6px"),
          (r.style.cssFloat = "left"),
          (r.onmouseover = () => {
            (r.style.backgroundColor = "rgb(220, 220, 220)"),
              (r.style.cursor = "pointer");
          }),
          (r.onmousedown = () => {
            r.style.backgroundColor = "rgb(200, 200, 200)";
          }),
          (r.onmouseup = () => {
            r.style.backgroundColor = "rgb(220, 220, 220)";
          }),
          (r.onmouseleave = () => {
            (r.style.backgroundColor = "rgb(238, 238, 238)"),
              (r.style.cursor = "");
          });
        const i = document.createElement("i");
        return (
          i.setAttribute("class", `fa-${t} fa`),
          (i.style.fontSize = "12px"),
          (i.style.color = "rgb(50, 50, 50)"),
          (i.style.lineHeight = "28px"),
          r.appendChild(i),
          r
        );
      }),
        (n.setIcon = (t, n) => {
          const e = t.querySelector("i");
          null !== e && e.setAttribute("class", `fa-${n} fa`);
        });
    },
    function (t, n, e) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, n) {
                t.__proto__ = n;
              }) ||
            function (t, n) {
              for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            }),
          function (t, n) {
            function e() {
              this.constructor = t;
            }
            r(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          });
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = e(1),
        s = (function (t) {
          function n(n) {
            var e = t.call(this) || this,
              r = n;
            return (
              r.trigger && (e.trigger = r.trigger),
              r.kick && (e.kick = r.kick),
              r.drag && (e.drag = r.drag),
              r.on && (e.on = r.on),
              (e.dragstart = e.dragStart = o.Layout.dragStart),
              (e.dragend = e.dragEnd = o.Layout.dragEnd),
              e
            );
          }
          return (
            i(n, t),
            (n.prototype.trigger = function (t) {}),
            (n.prototype.kick = function () {}),
            (n.prototype.drag = function () {}),
            (n.prototype.on = function (t, n) {
              return this;
            }),
            n
          );
        })(o.Layout);
      (n.LayoutAdaptor = s),
        (n.adaptor = function (t) {
          return new s(t);
        });
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(21),
        i = e(22);
      n.d3adaptor = function (t) {
        return !t ||
          (function (t) {
            return t.version && null !== t.version.match(/^3\./);
          })(t)
          ? new r.D3StyleLayoutAdaptor()
          : new i.D3StyleLayoutAdaptor(t);
      };
    },
    function (t, n, e) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, n) {
                t.__proto__ = n;
              }) ||
            function (t, n) {
              for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            }),
          function (t, n) {
            function e() {
              this.constructor = t;
            }
            r(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          });
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = e(1),
        s = (function (t) {
          function n() {
            var n = t.call(this) || this;
            n.event = d3.dispatch(
              o.EventType[o.EventType.start],
              o.EventType[o.EventType.tick],
              o.EventType[o.EventType.end]
            );
            var e = n;
            return (
              (n.drag = function () {
                if (!t)
                  var t = d3.behavior
                    .drag()
                    .origin(o.Layout.dragOrigin)
                    .on("dragstart.d3adaptor", o.Layout.dragStart)
                    .on("drag.d3adaptor", function (t) {
                      o.Layout.drag(t, d3.event), e.resume();
                    })
                    .on("dragend.d3adaptor", o.Layout.dragEnd);
                if (!arguments.length) return t;
                this.call(t);
              }),
              n
            );
          }
          return (
            i(n, t),
            (n.prototype.trigger = function (t) {
              var n = {
                type: o.EventType[t.type],
                alpha: t.alpha,
                stress: t.stress,
              };
              this.event[n.type](n);
            }),
            (n.prototype.kick = function () {
              var n = this;
              d3.timer(function () {
                return t.prototype.tick.call(n);
              });
            }),
            (n.prototype.on = function (t, n) {
              return (
                "string" == typeof t
                  ? this.event.on(t, n)
                  : this.event.on(o.EventType[t], n),
                this
              );
            }),
            n
          );
        })(o.Layout);
      (n.D3StyleLayoutAdaptor = s),
        (n.d3adaptor = function () {
          return new s();
        });
    },
    function (t, n, e) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, n) {
                t.__proto__ = n;
              }) ||
            function (t, n) {
              for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            }),
          function (t, n) {
            function e() {
              this.constructor = t;
            }
            r(t, n),
              (t.prototype =
                null === n
                  ? Object.create(n)
                  : ((e.prototype = n.prototype), new e()));
          });
      Object.defineProperty(n, "__esModule", { value: !0 });
      var o = e(1),
        s = (function (t) {
          function n(n) {
            var e = t.call(this) || this;
            (e.d3Context = n),
              (e.event = n.dispatch(
                o.EventType[o.EventType.start],
                o.EventType[o.EventType.tick],
                o.EventType[o.EventType.end]
              ));
            var r = e;
            return (
              (e.drag = function () {
                if (!t)
                  var t = n
                    .drag()
                    .subject(o.Layout.dragOrigin)
                    .on("start.d3adaptor", o.Layout.dragStart)
                    .on("drag.d3adaptor", function (t) {
                      o.Layout.drag(t, n.event), r.resume();
                    })
                    .on("end.d3adaptor", o.Layout.dragEnd);
                if (!arguments.length) return t;
                arguments[0].call(t);
              }),
              e
            );
          }
          return (
            i(n, t),
            (n.prototype.trigger = function (t) {
              var n = {
                type: o.EventType[t.type],
                alpha: t.alpha,
                stress: t.stress,
              };
              this.event.call(n.type, n);
            }),
            (n.prototype.kick = function () {
              var n = this,
                e = this.d3Context.timer(function () {
                  return t.prototype.tick.call(n) && e.stop();
                });
            }),
            (n.prototype.on = function (t, n) {
              return (
                "string" == typeof t
                  ? this.event.on(t, n)
                  : this.event.on(o.EventType[t], n),
                this
              );
            }),
            n
          );
        })(o.Layout);
      n.D3StyleLayoutAdaptor = s;
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(3),
        i = e(5),
        o = e(2),
        s = e(4),
        u = (function () {
          function t(t, n) {
            (this.source = t), (this.target = n);
          }
          return (
            (t.prototype.actualLength = function (t) {
              var n = this;
              return Math.sqrt(
                t.reduce(function (t, e) {
                  var r = e[n.target] - e[n.source];
                  return t + r * r;
                }, 0)
              );
            }),
            t
          );
        })();
      n.Link3D = u;
      var a = (function () {
        return function (t, n, e) {
          void 0 === t && (t = 0),
            void 0 === n && (n = 0),
            void 0 === e && (e = 0),
            (this.x = t),
            (this.y = n),
            (this.z = e);
        };
      })();
      n.Node3D = a;
      var c = (function () {
        function t(n, e, r) {
          void 0 === r && (r = 1);
          var i = this;
          (this.nodes = n),
            (this.links = e),
            (this.idealLinkLength = r),
            (this.constraints = null),
            (this.useJaccardLinkLengths = !0),
            (this.result = new Array(t.k));
          for (var o = 0; o < t.k; ++o) this.result[o] = new Array(n.length);
          n.forEach(function (n, e) {
            for (var r = 0, o = t.dims; r < o.length; r++) {
              var s = o[r];
              void 0 === n[s] && (n[s] = Math.random());
            }
            (i.result[0][e] = n.x),
              (i.result[1][e] = n.y),
              (i.result[2][e] = n.z);
          });
        }
        return (
          (t.prototype.linkLength = function (t) {
            return t.actualLength(this.result);
          }),
          (t.prototype.start = function (t) {
            var n = this;
            void 0 === t && (t = 100);
            var e = this.nodes.length,
              u = new h();
            this.useJaccardLinkLengths &&
              s.jaccardLinkLengths(this.links, u, 1.5),
              this.links.forEach(function (t) {
                return (t.length *= n.idealLinkLength);
              });
            var a = new r.Calculator(
                e,
                this.links,
                function (t) {
                  return t.source;
                },
                function (t) {
                  return t.target;
                },
                function (t) {
                  return t.length;
                }
              ).DistanceMatrix(),
              c = i.Descent.createSquareMatrix(e, function (t, n) {
                return a[t][n];
              }),
              l = i.Descent.createSquareMatrix(e, function () {
                return 2;
              });
            this.links.forEach(function (t) {
              var n = t.source,
                e = t.target;
              return (l[n][e] = l[e][n] = 1);
            }),
              (this.descent = new i.Descent(this.result, c)),
              (this.descent.threshold = 0.001),
              (this.descent.G = l),
              this.constraints &&
                (this.descent.project = new o.Projection(
                  this.nodes,
                  null,
                  null,
                  this.constraints
                ).projectFunctions());
            for (var f = 0; f < this.nodes.length; f++) {
              var p = this.nodes[f];
              p.fixed && this.descent.locks.add(f, [p.x, p.y, p.z]);
            }
            return this.descent.run(t), this;
          }),
          (t.prototype.tick = function () {
            this.descent.locks.clear();
            for (var t = 0; t < this.nodes.length; t++) {
              var n = this.nodes[t];
              n.fixed && this.descent.locks.add(t, [n.x, n.y, n.z]);
            }
            return this.descent.rungeKutta();
          }),
          (t.dims = ["x", "y", "z"]),
          (t.k = t.dims.length),
          t
        );
      })();
      n.Layout3D = c;
      var h = (function () {
        function t() {}
        return (
          (t.prototype.getSourceIndex = function (t) {
            return t.source;
          }),
          (t.prototype.getTargetIndex = function (t) {
            return t.target;
          }),
          (t.prototype.getLength = function (t) {
            return t.length;
          }),
          (t.prototype.setLength = function (t, n) {
            t.length = n;
          }),
          t
        );
      })();
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: !0 });
      var r = e(1),
        i = e(13);
      (n.gridify = function (t, n, e, r) {
        return (
          t.cola.start(0, 0, 0, 10, !1),
          (function (t, n, e, r) {
            t.forEach(function (t) {
              t.routerNode = { name: t.name, bounds: t.bounds.inflate(-e) };
            }),
              n.forEach(function (n) {
                n.routerNode = {
                  bounds: n.bounds.inflate(-r),
                  children: (void 0 !== n.groups
                    ? n.groups.map(function (n) {
                        return t.length + n.id;
                      })
                    : []
                  ).concat(
                    void 0 !== n.leaves
                      ? n.leaves.map(function (t) {
                          return t.index;
                        })
                      : []
                  ),
                };
              });
            var o = t.concat(n).map(function (t, n) {
              return (t.routerNode.id = n), t.routerNode;
            });
            return new i.GridRouter(
              o,
              {
                getChildren: function (t) {
                  return t.children;
                },
                getBounds: function (t) {
                  return t.bounds;
                },
              },
              e - r
            );
          })(t.cola.nodes(), t.cola.groups(), e, r).routeEdges(
            t.powerGraph.powerEdges,
            n,
            function (t) {
              return t.source.routerNode.id;
            },
            function (t) {
              return t.target.routerNode.id;
            }
          )
        );
      }),
        (n.powerGraphGridLayout = function (t, n, e) {
          var i;
          t.nodes.forEach(function (t, n) {
            return (t.index = n);
          }),
            new r.Layout()
              .avoidOverlaps(!1)
              .nodes(t.nodes)
              .links(t.links)
              .powerGraphGroups(function (t) {
                (i = t).groups.forEach(function (t) {
                  return (t.padding = e);
                });
              });
          var o = t.nodes.length,
            s = [],
            u = t.nodes.slice(0);
          return (
            u.forEach(function (t, n) {
              return (t.index = n);
            }),
            i.groups.forEach(function (t) {
              var n = (t.index = t.id + o);
              u.push(t),
                void 0 !== t.leaves &&
                  t.leaves.forEach(function (t) {
                    return s.push({ source: n, target: t.index });
                  }),
                void 0 !== t.groups &&
                  t.groups.forEach(function (t) {
                    return s.push({ source: n, target: t.id + o });
                  });
            }),
            i.powerEdges.forEach(function (t) {
              s.push({ source: t.source.index, target: t.target.index });
            }),
            new r.Layout()
              .size(n)
              .nodes(u)
              .links(s)
              .avoidOverlaps(!1)
              .linkDistance(30)
              .symmetricDiffLinkLengths(5)
              .convergenceThreshold(1e-4)
              .start(100, 0, 0, 0, !1),
            {
              cola: new r.Layout()
                .convergenceThreshold(0.001)
                .size(n)
                .avoidOverlaps(!0)
                .nodes(t.nodes)
                .links(t.links)
                .groupCompactness(1e-4)
                .linkDistance(30)
                .symmetricDiffLinkLengths(5)
                .powerGraphGroups(function (t) {
                  (i = t).groups.forEach(function (t) {
                    t.padding = e;
                  });
                })
                .start(50, 0, 100, 0, !1),
              powerGraph: i,
            }
          );
        });
    },
    function (t, n, e) {
      "use strict";
      e.r(n);
      var r = {};
      e.r(r),
        e.d(r, "easeLinear", function () {
          return Se;
        }),
        e.d(r, "easeQuad", function () {
          return Ne;
        }),
        e.d(r, "easeQuadIn", function () {
          return Ae;
        }),
        e.d(r, "easeQuadOut", function () {
          return Oe;
        }),
        e.d(r, "easeQuadInOut", function () {
          return Ne;
        }),
        e.d(r, "easeCubic", function () {
          return ze;
        }),
        e.d(r, "easeCubicIn", function () {
          return Pe;
        }),
        e.d(r, "easeCubicOut", function () {
          return Te;
        }),
        e.d(r, "easeCubicInOut", function () {
          return ze;
        }),
        e.d(r, "easePoly", function () {
          return Le;
        }),
        e.d(r, "easePolyIn", function () {
          return Ie;
        }),
        e.d(r, "easePolyOut", function () {
          return Ce;
        }),
        e.d(r, "easePolyInOut", function () {
          return Le;
        }),
        e.d(r, "easeSin", function () {
          return Be;
        }),
        e.d(r, "easeSinIn", function () {
          return De;
        }),
        e.d(r, "easeSinOut", function () {
          return Ve;
        }),
        e.d(r, "easeSinInOut", function () {
          return Be;
        }),
        e.d(r, "easeExp", function () {
          return Xe;
        }),
        e.d(r, "easeExpIn", function () {
          return Re;
        }),
        e.d(r, "easeExpOut", function () {
          return Ge;
        }),
        e.d(r, "easeExpInOut", function () {
          return Xe;
        }),
        e.d(r, "easeCircle", function () {
          return Fe;
        }),
        e.d(r, "easeCircleIn", function () {
          return Ye;
        }),
        e.d(r, "easeCircleOut", function () {
          return He;
        }),
        e.d(r, "easeCircleInOut", function () {
          return Fe;
        }),
        e.d(r, "easeBounce", function () {
          return ir;
        }),
        e.d(r, "easeBounceIn", function () {
          return rr;
        }),
        e.d(r, "easeBounceOut", function () {
          return ir;
        }),
        e.d(r, "easeBounceInOut", function () {
          return or;
        }),
        e.d(r, "easeBack", function () {
          return ar;
        }),
        e.d(r, "easeBackIn", function () {
          return sr;
        }),
        e.d(r, "easeBackOut", function () {
          return ur;
        }),
        e.d(r, "easeBackInOut", function () {
          return ar;
        }),
        e.d(r, "easeElastic", function () {
          return lr;
        }),
        e.d(r, "easeElasticIn", function () {
          return hr;
        }),
        e.d(r, "easeElasticOut", function () {
          return lr;
        }),
        e.d(r, "easeElasticInOut", function () {
          return fr;
        });
      var i = {};
      e.r(i),
        e.d(i, "arc", function () {
          return $r;
        }),
        e.d(i, "area", function () {
          return ri;
        }),
        e.d(i, "line", function () {
          return ei;
        }),
        e.d(i, "pie", function () {
          return si;
        }),
        e.d(i, "areaRadial", function () {
          return fi;
        }),
        e.d(i, "radialArea", function () {
          return fi;
        }),
        e.d(i, "lineRadial", function () {
          return li;
        }),
        e.d(i, "radialLine", function () {
          return li;
        }),
        e.d(i, "pointRadial", function () {
          return pi;
        }),
        e.d(i, "linkHorizontal", function () {
          return bi;
        }),
        e.d(i, "linkVertical", function () {
          return wi;
        }),
        e.d(i, "linkRadial", function () {
          return ki;
        }),
        e.d(i, "symbol", function () {
          return Ri;
        }),
        e.d(i, "symbols", function () {
          return Bi;
        }),
        e.d(i, "symbolCircle", function () {
          return Mi;
        }),
        e.d(i, "symbolCross", function () {
          return Ei;
        }),
        e.d(i, "symbolDiamond", function () {
          return Oi;
        }),
        e.d(i, "symbolSquare", function () {
          return Ii;
        }),
        e.d(i, "symbolStar", function () {
          return zi;
        }),
        e.d(i, "symbolTriangle", function () {
          return Li;
        }),
        e.d(i, "symbolWye", function () {
          return Vi;
        }),
        e.d(i, "curveBasisClosed", function () {
          return Ui;
        }),
        e.d(i, "curveBasisOpen", function () {
          return Qi;
        }),
        e.d(i, "curveBasis", function () {
          return Hi;
        }),
        e.d(i, "curveBundle", function () {
          return $i;
        }),
        e.d(i, "curveCardinalClosed", function () {
          return eo;
        }),
        e.d(i, "curveCardinalOpen", function () {
          return io;
        }),
        e.d(i, "curveCardinal", function () {
          return to;
        }),
        e.d(i, "curveCatmullRomClosed", function () {
          return co;
        }),
        e.d(i, "curveCatmullRomOpen", function () {
          return lo;
        }),
        e.d(i, "curveCatmullRom", function () {
          return uo;
        }),
        e.d(i, "curveLinearClosed", function () {
          return po;
        }),
        e.d(i, "curveLinear", function () {
          return Zr;
        }),
        e.d(i, "curveMonotoneX", function () {
          return wo;
        }),
        e.d(i, "curveMonotoneY", function () {
          return ko;
        }),
        e.d(i, "curveNatural", function () {
          return So;
        }),
        e.d(i, "curveStep", function () {
          return Oo;
        }),
        e.d(i, "curveStepAfter", function () {
          return Po;
        }),
        e.d(i, "curveStepBefore", function () {
          return No;
        }),
        e.d(i, "stack", function () {
          return Co;
        }),
        e.d(i, "stackOffsetExpand", function () {
          return Lo;
        }),
        e.d(i, "stackOffsetDiverging", function () {
          return jo;
        }),
        e.d(i, "stackOffsetNone", function () {
          return To;
        }),
        e.d(i, "stackOffsetSilhouette", function () {
          return qo;
        }),
        e.d(i, "stackOffsetWiggle", function () {
          return Do;
        }),
        e.d(i, "stackOrderAscending", function () {
          return Vo;
        }),
        e.d(i, "stackOrderDescending", function () {
          return Ro;
        }),
        e.d(i, "stackOrderInsideOut", function () {
          return Go;
        }),
        e.d(i, "stackOrderNone", function () {
          return zo;
        }),
        e.d(i, "stackOrderReverse", function () {
          return Xo;
        });
      var o = "http://www.w3.org/1999/xhtml",
        s = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: o,
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        u = function (t) {
          var n = (t += ""),
            e = n.indexOf(":");
          return (
            e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
            s.hasOwnProperty(n) ? { space: s[n], local: t } : t
          );
        };
      var a = function (t) {
        var n = u(t);
        return (n.local
          ? function (t) {
              return function () {
                return this.ownerDocument.createElementNS(t.space, t.local);
              };
            }
          : function (t) {
              return function () {
                var n = this.ownerDocument,
                  e = this.namespaceURI;
                return e === o && n.documentElement.namespaceURI === o
                  ? n.createElement(t)
                  : n.createElementNS(e, t);
              };
            })(n);
      };
      function c() {}
      var h = function (t) {
        return null == t
          ? c
          : function () {
              return this.querySelector(t);
            };
      };
      function l() {
        return [];
      }
      var f = function (t) {
          return null == t
            ? l
            : function () {
                return this.querySelectorAll(t);
              };
        },
        p = function (t) {
          return function () {
            return this.matches(t);
          };
        };
      if ("undefined" != typeof document) {
        var d = document.documentElement;
        if (!d.matches) {
          var v =
            d.webkitMatchesSelector ||
            d.msMatchesSelector ||
            d.mozMatchesSelector ||
            d.oMatchesSelector;
          p = function (t) {
            return function () {
              return v.call(this, t);
            };
          };
        }
      }
      var y = p,
        g = function (t) {
          return new Array(t.length);
        };
      function _(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      _.prototype = {
        constructor: _,
        appendChild: function (t) {
          return this._parent.insertBefore(t, this._next);
        },
        insertBefore: function (t, n) {
          return this._parent.insertBefore(t, n);
        },
        querySelector: function (t) {
          return this._parent.querySelector(t);
        },
        querySelectorAll: function (t) {
          return this._parent.querySelectorAll(t);
        },
      };
      var m = "$";
      function x(t, n, e, r, i, o) {
        for (var s, u = 0, a = n.length, c = o.length; u < c; ++u)
          (s = n[u])
            ? ((s.__data__ = o[u]), (r[u] = s))
            : (e[u] = new _(t, o[u]));
        for (; u < a; ++u) (s = n[u]) && (i[u] = s);
      }
      function b(t, n, e, r, i, o, s) {
        var u,
          a,
          c,
          h = {},
          l = n.length,
          f = o.length,
          p = new Array(l);
        for (u = 0; u < l; ++u)
          (a = n[u]) &&
            ((p[u] = c = m + s.call(a, a.__data__, u, n)),
            c in h ? (i[u] = a) : (h[c] = a));
        for (u = 0; u < f; ++u)
          (a = h[(c = m + s.call(t, o[u], u, o))])
            ? ((r[u] = a), (a.__data__ = o[u]), (h[c] = null))
            : (e[u] = new _(t, o[u]));
        for (u = 0; u < l; ++u) (a = n[u]) && h[p[u]] === a && (i[u] = a);
      }
      function w(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var k = function (t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          (t.document && t) ||
          t.defaultView
        );
      };
      function M(t, n) {
        return (
          t.style.getPropertyValue(n) ||
          k(t).getComputedStyle(t, null).getPropertyValue(n)
        );
      }
      function E(t) {
        return t.trim().split(/^|\s+/);
      }
      function S(t) {
        return t.classList || new A(t);
      }
      function A(t) {
        (this._node = t), (this._names = E(t.getAttribute("class") || ""));
      }
      function O(t, n) {
        for (var e = S(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
      }
      function N(t, n) {
        for (var e = S(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
      }
      A.prototype = {
        add: function (t) {
          this._names.indexOf(t) < 0 &&
            (this._names.push(t),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        remove: function (t) {
          var n = this._names.indexOf(t);
          n >= 0 &&
            (this._names.splice(n, 1),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        contains: function (t) {
          return this._names.indexOf(t) >= 0;
        },
      };
      function P() {
        this.textContent = "";
      }
      function T() {
        this.innerHTML = "";
      }
      function z() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      function I() {
        this.previousSibling &&
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function C() {
        return null;
      }
      function L() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      function j() {
        return this.parentNode.insertBefore(
          this.cloneNode(!1),
          this.nextSibling
        );
      }
      function q() {
        return this.parentNode.insertBefore(
          this.cloneNode(!0),
          this.nextSibling
        );
      }
      var D = {},
        V = null;
      "undefined" != typeof document &&
        ("onmouseenter" in document.documentElement ||
          (D = { mouseenter: "mouseover", mouseleave: "mouseout" }));
      function B(t, n, e) {
        return (
          (t = R(t, n, e)),
          function (n) {
            var e = n.relatedTarget;
            (e && (e === this || 8 & e.compareDocumentPosition(this))) ||
              t.call(this, n);
          }
        );
      }
      function R(t, n, e) {
        return function (r) {
          var i = V;
          V = r;
          try {
            t.call(this, this.__data__, n, e);
          } finally {
            V = i;
          }
        };
      }
      function G(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.capture);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function X(t, n, e) {
        var r = D.hasOwnProperty(t.type) ? B : R;
        return function (i, o, s) {
          var u,
            a = this.__on,
            c = r(n, o, s);
          if (a)
            for (var h = 0, l = a.length; h < l; ++h)
              if ((u = a[h]).type === t.type && u.name === t.name)
                return (
                  this.removeEventListener(u.type, u.listener, u.capture),
                  this.addEventListener(
                    u.type,
                    (u.listener = c),
                    (u.capture = e)
                  ),
                  void (u.value = n)
                );
          this.addEventListener(t.type, c, e),
            (u = {
              type: t.type,
              name: t.name,
              value: n,
              listener: c,
              capture: e,
            }),
            a ? a.push(u) : (this.__on = [u]);
        };
      }
      function Y(t, n, e, r) {
        var i = V;
        (t.sourceEvent = V), (V = t);
        try {
          return n.apply(e, r);
        } finally {
          V = i;
        }
      }
      function H(t, n, e) {
        var r = k(t),
          i = r.CustomEvent;
        "function" == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent("Event")),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i);
      }
      var F = [null];
      function U(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function W() {
        return new U([[document.documentElement]], F);
      }
      U.prototype = W.prototype = {
        constructor: U,
        select: function (t) {
          "function" != typeof t && (t = h(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o,
                s,
                u = n[i],
                a = u.length,
                c = (r[i] = new Array(a)),
                l = 0;
              l < a;
              ++l
            )
              (o = u[l]) &&
                (s = t.call(o, o.__data__, l, u)) &&
                ("__data__" in o && (s.__data__ = o.__data__), (c[l] = s));
          return new U(r, this._parents);
        },
        selectAll: function (t) {
          "function" != typeof t && (t = f(t));
          for (
            var n = this._groups, e = n.length, r = [], i = [], o = 0;
            o < e;
            ++o
          )
            for (var s, u = n[o], a = u.length, c = 0; c < a; ++c)
              (s = u[c]) && (r.push(t.call(s, s.__data__, c, u)), i.push(s));
          return new U(r, i);
        },
        filter: function (t) {
          "function" != typeof t && (t = y(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o, s = n[i], u = s.length, a = (r[i] = []), c = 0;
              c < u;
              ++c
            )
              (o = s[c]) && t.call(o, o.__data__, c, s) && a.push(o);
          return new U(r, this._parents);
        },
        data: function (t, n) {
          if (!t)
            return (
              (d = new Array(this.size())),
              (h = -1),
              this.each(function (t) {
                d[++h] = t;
              }),
              d
            );
          var e,
            r = n ? b : x,
            i = this._parents,
            o = this._groups;
          "function" != typeof t &&
            ((e = t),
            (t = function () {
              return e;
            }));
          for (
            var s = o.length,
              u = new Array(s),
              a = new Array(s),
              c = new Array(s),
              h = 0;
            h < s;
            ++h
          ) {
            var l = i[h],
              f = o[h],
              p = f.length,
              d = t.call(l, l && l.__data__, h, i),
              v = d.length,
              y = (a[h] = new Array(v)),
              g = (u[h] = new Array(v));
            r(l, f, y, g, (c[h] = new Array(p)), d, n);
            for (var _, m, w = 0, k = 0; w < v; ++w)
              if ((_ = y[w])) {
                for (w >= k && (k = w + 1); !(m = g[k]) && ++k < v; );
                _._next = m || null;
              }
          }
          return ((u = new U(u, i))._enter = a), (u._exit = c), u;
        },
        enter: function () {
          return new U(this._enter || this._groups.map(g), this._parents);
        },
        exit: function () {
          return new U(this._exit || this._groups.map(g), this._parents);
        },
        merge: function (t) {
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              o = Math.min(r, i),
              s = new Array(r),
              u = 0;
            u < o;
            ++u
          )
            for (
              var a,
                c = n[u],
                h = e[u],
                l = c.length,
                f = (s[u] = new Array(l)),
                p = 0;
              p < l;
              ++p
            )
              (a = c[p] || h[p]) && (f[p] = a);
          for (; u < r; ++u) s[u] = n[u];
          return new U(s, this._parents);
        },
        order: function () {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], o = i.length - 1, s = i[o]; --o >= 0; )
              (r = i[o]) &&
                (s && s !== r.nextSibling && s.parentNode.insertBefore(r, s),
                (s = r));
          return this;
        },
        sort: function (t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e;
          }
          t || (t = w);
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          ) {
            for (
              var s, u = e[o], a = u.length, c = (i[o] = new Array(a)), h = 0;
              h < a;
              ++h
            )
              (s = u[h]) && (c[h] = s);
            c.sort(n);
          }
          return new U(i, this._parents).order();
        },
        call: function () {
          var t = arguments[0];
          return (arguments[0] = this), t.apply(null, arguments), this;
        },
        nodes: function () {
          var t = new Array(this.size()),
            n = -1;
          return (
            this.each(function () {
              t[++n] = this;
            }),
            t
          );
        },
        node: function () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
              var s = r[i];
              if (s) return s;
            }
          return null;
        },
        size: function () {
          var t = 0;
          return (
            this.each(function () {
              ++t;
            }),
            t
          );
        },
        empty: function () {
          return !this.node();
        },
        each: function (t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], s = 0, u = o.length; s < u; ++s)
              (i = o[s]) && t.call(i, i.__data__, s, o);
          return this;
        },
        attr: function (t, n) {
          var e = u(t);
          if (arguments.length < 2) {
            var r = this.node();
            return e.local
              ? r.getAttributeNS(e.space, e.local)
              : r.getAttribute(e);
          }
          return this.each(
            (null == n
              ? e.local
                ? function (t) {
                    return function () {
                      this.removeAttributeNS(t.space, t.local);
                    };
                  }
                : function (t) {
                    return function () {
                      this.removeAttribute(t);
                    };
                  }
              : "function" == typeof n
              ? e.local
                ? function (t, n) {
                    return function () {
                      var e = n.apply(this, arguments);
                      null == e
                        ? this.removeAttributeNS(t.space, t.local)
                        : this.setAttributeNS(t.space, t.local, e);
                    };
                  }
                : function (t, n) {
                    return function () {
                      var e = n.apply(this, arguments);
                      null == e
                        ? this.removeAttribute(t)
                        : this.setAttribute(t, e);
                    };
                  }
              : e.local
              ? function (t, n) {
                  return function () {
                    this.setAttributeNS(t.space, t.local, n);
                  };
                }
              : function (t, n) {
                  return function () {
                    this.setAttribute(t, n);
                  };
                })(e, n)
          );
        },
        style: function (t, n, e) {
          return arguments.length > 1
            ? this.each(
                (null == n
                  ? function (t) {
                      return function () {
                        this.style.removeProperty(t);
                      };
                    }
                  : "function" == typeof n
                  ? function (t, n, e) {
                      return function () {
                        var r = n.apply(this, arguments);
                        null == r
                          ? this.style.removeProperty(t)
                          : this.style.setProperty(t, r, e);
                      };
                    }
                  : function (t, n, e) {
                      return function () {
                        this.style.setProperty(t, n, e);
                      };
                    })(t, n, null == e ? "" : e)
              )
            : M(this.node(), t);
        },
        property: function (t, n) {
          return arguments.length > 1
            ? this.each(
                (null == n
                  ? function (t) {
                      return function () {
                        delete this[t];
                      };
                    }
                  : "function" == typeof n
                  ? function (t, n) {
                      return function () {
                        var e = n.apply(this, arguments);
                        null == e ? delete this[t] : (this[t] = e);
                      };
                    }
                  : function (t, n) {
                      return function () {
                        this[t] = n;
                      };
                    })(t, n)
              )
            : this.node()[t];
        },
        classed: function (t, n) {
          var e = E(t + "");
          if (arguments.length < 2) {
            for (var r = S(this.node()), i = -1, o = e.length; ++i < o; )
              if (!r.contains(e[i])) return !1;
            return !0;
          }
          return this.each(
            ("function" == typeof n
              ? function (t, n) {
                  return function () {
                    (n.apply(this, arguments) ? O : N)(this, t);
                  };
                }
              : n
              ? function (t) {
                  return function () {
                    O(this, t);
                  };
                }
              : function (t) {
                  return function () {
                    N(this, t);
                  };
                })(e, n)
          );
        },
        text: function (t) {
          return arguments.length
            ? this.each(
                null == t
                  ? P
                  : ("function" == typeof t
                      ? function (t) {
                          return function () {
                            var n = t.apply(this, arguments);
                            this.textContent = null == n ? "" : n;
                          };
                        }
                      : function (t) {
                          return function () {
                            this.textContent = t;
                          };
                        })(t)
              )
            : this.node().textContent;
        },
        html: function (t) {
          return arguments.length
            ? this.each(
                null == t
                  ? T
                  : ("function" == typeof t
                      ? function (t) {
                          return function () {
                            var n = t.apply(this, arguments);
                            this.innerHTML = null == n ? "" : n;
                          };
                        }
                      : function (t) {
                          return function () {
                            this.innerHTML = t;
                          };
                        })(t)
              )
            : this.node().innerHTML;
        },
        raise: function () {
          return this.each(z);
        },
        lower: function () {
          return this.each(I);
        },
        append: function (t) {
          var n = "function" == typeof t ? t : a(t);
          return this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        },
        insert: function (t, n) {
          var e = "function" == typeof t ? t : a(t),
            r = null == n ? C : "function" == typeof n ? n : h(n);
          return this.select(function () {
            return this.insertBefore(
              e.apply(this, arguments),
              r.apply(this, arguments) || null
            );
          });
        },
        remove: function () {
          return this.each(L);
        },
        clone: function (t) {
          return this.select(t ? q : j);
        },
        datum: function (t) {
          return arguments.length
            ? this.property("__data__", t)
            : this.node().__data__;
        },
        on: function (t, n, e) {
          var r,
            i,
            o = (function (t) {
              return t
                .trim()
                .split(/^|\s+/)
                .map(function (t) {
                  var n = "",
                    e = t.indexOf(".");
                  return (
                    e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
                    { type: t, name: n }
                  );
                });
            })(t + ""),
            s = o.length;
          if (!(arguments.length < 2)) {
            for (u = n ? X : G, null == e && (e = !1), r = 0; r < s; ++r)
              this.each(u(o[r], n, e));
            return this;
          }
          var u = this.node().__on;
          if (u)
            for (var a, c = 0, h = u.length; c < h; ++c)
              for (r = 0, a = u[c]; r < s; ++r)
                if ((i = o[r]).type === a.type && i.name === a.name)
                  return a.value;
        },
        dispatch: function (t, n) {
          return this.each(
            ("function" == typeof n
              ? function (t, n) {
                  return function () {
                    return H(this, t, n.apply(this, arguments));
                  };
                }
              : function (t, n) {
                  return function () {
                    return H(this, t, n);
                  };
                })(t, n)
          );
        },
      };
      var Q = W,
        K = function (t) {
          return "string" == typeof t
            ? new U([[document.querySelector(t)]], [document.documentElement])
            : new U([[t]], F);
        },
        $ = 0;
      function J() {
        this._ = "@" + (++$).toString(36);
      }
      J.prototype = function () {
        return new J();
      }.prototype = {
        constructor: J,
        get: function (t) {
          for (var n = this._; !(n in t); ) if (!(t = t.parentNode)) return;
          return t[n];
        },
        set: function (t, n) {
          return (t[this._] = n);
        },
        remove: function (t) {
          return this._ in t && delete t[this._];
        },
        toString: function () {
          return this._;
        },
      };
      var Z = function () {
          for (var t, n = V; (t = n.sourceEvent); ) n = t;
          return n;
        },
        tt = function (t, n) {
          var e = t.ownerSVGElement || t;
          if (e.createSVGPoint) {
            var r = e.createSVGPoint();
            return (
              (r.x = n.clientX),
              (r.y = n.clientY),
              [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
            );
          }
          var i = t.getBoundingClientRect();
          return [
            n.clientX - i.left - t.clientLeft,
            n.clientY - i.top - t.clientTop,
          ];
        },
        nt = function (t) {
          var n = Z();
          return n.changedTouches && (n = n.changedTouches[0]), tt(t, n);
        },
        et = function (t, n, e) {
          arguments.length < 3 && ((e = n), (n = Z().changedTouches));
          for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
            if ((r = n[i]).identifier === e) return tt(t, r);
          return null;
        },
        rt = { value: function () {} };
      function it() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
          if (!(t = arguments[n] + "") || t in r)
            throw new Error("illegal type: " + t);
          r[t] = [];
        }
        return new ot(r);
      }
      function ot(t) {
        this._ = t;
      }
      function st(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r)
          if ((e = t[r]).name === n) return e.value;
      }
      function ut(t, n, e) {
        for (var r = 0, i = t.length; r < i; ++r)
          if (t[r].name === n) {
            (t[r] = rt), (t = t.slice(0, r).concat(t.slice(r + 1)));
            break;
          }
        return null != e && t.push({ name: n, value: e }), t;
      }
      ot.prototype = it.prototype = {
        constructor: ot,
        on: function (t, n) {
          var e,
            r,
            i = this._,
            o =
              ((r = i),
              (t + "")
                .trim()
                .split(/^|\s+/)
                .map(function (t) {
                  var n = "",
                    e = t.indexOf(".");
                  if (
                    (e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
                    t && !r.hasOwnProperty(t))
                  )
                    throw new Error("unknown type: " + t);
                  return { type: t, name: n };
                })),
            s = -1,
            u = o.length;
          if (!(arguments.length < 2)) {
            if (null != n && "function" != typeof n)
              throw new Error("invalid callback: " + n);
            for (; ++s < u; )
              if ((e = (t = o[s]).type)) i[e] = ut(i[e], t.name, n);
              else if (null == n) for (e in i) i[e] = ut(i[e], t.name, null);
            return this;
          }
          for (; ++s < u; )
            if ((e = (t = o[s]).type) && (e = st(i[e], t.name))) return e;
        },
        copy: function () {
          var t = {},
            n = this._;
          for (var e in n) t[e] = n[e].slice();
          return new ot(t);
        },
        call: function (t, n) {
          if ((e = arguments.length - 2) > 0)
            for (var e, r, i = new Array(e), o = 0; o < e; ++o)
              i[o] = arguments[o + 2];
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (o = 0, e = (r = this._[t]).length; o < e; ++o)
            r[o].value.apply(n, i);
        },
        apply: function (t, n, e) {
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
            r[i].value.apply(n, e);
        },
      };
      var at,
        ct,
        ht = it,
        lt = 0,
        ft = 0,
        pt = 0,
        dt = 1e3,
        vt = 0,
        yt = 0,
        gt = 0,
        _t =
          "object" == typeof performance && performance.now
            ? performance
            : Date,
        mt =
          "object" == typeof window && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                setTimeout(t, 17);
              };
      function xt() {
        return yt || (mt(bt), (yt = _t.now() + gt));
      }
      function bt() {
        yt = 0;
      }
      function wt() {
        this._call = this._time = this._next = null;
      }
      function kt(t, n, e) {
        var r = new wt();
        return r.restart(t, n, e), r;
      }
      function Mt() {
        (yt = (vt = _t.now()) + gt), (lt = ft = 0);
        try {
          !(function () {
            xt(), ++lt;
            for (var t, n = at; n; )
              (t = yt - n._time) >= 0 && n._call.call(null, t), (n = n._next);
            --lt;
          })();
        } finally {
          (lt = 0),
            (function () {
              var t,
                n,
                e = at,
                r = 1 / 0;
              for (; e; )
                e._call
                  ? (r > e._time && (r = e._time), (t = e), (e = e._next))
                  : ((n = e._next),
                    (e._next = null),
                    (e = t ? (t._next = n) : (at = n)));
              (ct = t), St(r);
            })(),
            (yt = 0);
        }
      }
      function Et() {
        var t = _t.now(),
          n = t - vt;
        n > dt && ((gt -= n), (vt = t));
      }
      function St(t) {
        lt ||
          (ft && (ft = clearTimeout(ft)),
          t - yt > 24
            ? (t < 1 / 0 && (ft = setTimeout(Mt, t - _t.now() - gt)),
              pt && (pt = clearInterval(pt)))
            : (pt || ((vt = _t.now()), (pt = setInterval(Et, dt))),
              (lt = 1),
              mt(Mt)));
      }
      wt.prototype = kt.prototype = {
        constructor: wt,
        restart: function (t, n, e) {
          if ("function" != typeof t)
            throw new TypeError("callback is not a function");
          (e = (null == e ? xt() : +e) + (null == n ? 0 : +n)),
            this._next ||
              ct === this ||
              (ct ? (ct._next = this) : (at = this), (ct = this)),
            (this._call = t),
            (this._time = e),
            St();
        },
        stop: function () {
          this._call && ((this._call = null), (this._time = 1 / 0), St());
        },
      };
      var At = function (t, n, e) {
          var r = new wt();
          return (
            (n = null == n ? 0 : +n),
            r.restart(
              function (e) {
                r.stop(), t(e + n);
              },
              n,
              e
            ),
            r
          );
        },
        Ot = ht("start", "end", "interrupt"),
        Nt = [],
        Pt = 0,
        Tt = 1,
        zt = 2,
        It = 3,
        Ct = 4,
        Lt = 5,
        jt = 6,
        qt = function (t, n, e, r, i, o) {
          var s = t.__transition;
          if (s) {
            if (e in s) return;
          } else t.__transition = {};
          !(function (t, n, e) {
            var r,
              i = t.__transition;
            function o(a) {
              var c, h, l, f;
              if (e.state !== Tt) return u();
              for (c in i)
                if ((f = i[c]).name === e.name) {
                  if (f.state === It) return At(o);
                  f.state === Ct
                    ? ((f.state = jt),
                      f.timer.stop(),
                      f.on.call("interrupt", t, t.__data__, f.index, f.group),
                      delete i[c])
                    : +c < n && ((f.state = jt), f.timer.stop(), delete i[c]);
                }
              if (
                (At(function () {
                  e.state === It &&
                    ((e.state = Ct), e.timer.restart(s, e.delay, e.time), s(a));
                }),
                (e.state = zt),
                e.on.call("start", t, t.__data__, e.index, e.group),
                e.state === zt)
              ) {
                for (
                  e.state = It,
                    r = new Array((l = e.tween.length)),
                    c = 0,
                    h = -1;
                  c < l;
                  ++c
                )
                  (f = e.tween[c].value.call(
                    t,
                    t.__data__,
                    e.index,
                    e.group
                  )) && (r[++h] = f);
                r.length = h + 1;
              }
            }
            function s(n) {
              for (
                var i =
                    n < e.duration
                      ? e.ease.call(null, n / e.duration)
                      : (e.timer.restart(u), (e.state = Lt), 1),
                  o = -1,
                  s = r.length;
                ++o < s;

              )
                r[o].call(null, i);
              e.state === Lt &&
                (e.on.call("end", t, t.__data__, e.index, e.group), u());
            }
            function u() {
              for (var r in ((e.state = jt), e.timer.stop(), delete i[n], i))
                return;
              delete t.__transition;
            }
            (i[n] = e),
              (e.timer = kt(
                function (t) {
                  (e.state = Tt),
                    e.timer.restart(o, e.delay, e.time),
                    e.delay <= t && o(t - e.delay);
                },
                0,
                e.time
              ));
          })(t, e, {
            name: n,
            index: r,
            group: i,
            on: Ot,
            tween: Nt,
            time: o.time,
            delay: o.delay,
            duration: o.duration,
            ease: o.ease,
            timer: null,
            state: Pt,
          });
        };
      function Dt(t, n) {
        var e = Bt(t, n);
        if (e.state > Pt) throw new Error("too late; already scheduled");
        return e;
      }
      function Vt(t, n) {
        var e = Bt(t, n);
        if (e.state > zt) throw new Error("too late; already started");
        return e;
      }
      function Bt(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error("transition not found");
        return e;
      }
      var Rt = function (t, n) {
          var e,
            r,
            i,
            o = t.__transition,
            s = !0;
          if (o) {
            for (i in ((n = null == n ? null : n + ""), o))
              (e = o[i]).name === n
                ? ((r = e.state > zt && e.state < Lt),
                  (e.state = jt),
                  e.timer.stop(),
                  r && e.on.call("interrupt", t, t.__data__, e.index, e.group),
                  delete o[i])
                : (s = !1);
            s && delete t.__transition;
          }
        },
        Gt = function (t, n, e) {
          (t.prototype = n.prototype = e), (e.constructor = t);
        };
      function Xt(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e;
      }
      function Yt() {}
      var Ht = "\\s*([+-]?\\d+)\\s*",
        Ft = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        Ut = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        Wt = /^#([0-9a-f]{3})$/,
        Qt = /^#([0-9a-f]{6})$/,
        Kt = new RegExp("^rgb\\(" + [Ht, Ht, Ht] + "\\)$"),
        $t = new RegExp("^rgb\\(" + [Ut, Ut, Ut] + "\\)$"),
        Jt = new RegExp("^rgba\\(" + [Ht, Ht, Ht, Ft] + "\\)$"),
        Zt = new RegExp("^rgba\\(" + [Ut, Ut, Ut, Ft] + "\\)$"),
        tn = new RegExp("^hsl\\(" + [Ft, Ut, Ut] + "\\)$"),
        nn = new RegExp("^hsla\\(" + [Ft, Ut, Ut, Ft] + "\\)$"),
        en = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        };
      function rn(t) {
        var n;
        return (
          (t = (t + "").trim().toLowerCase()),
          (n = Wt.exec(t))
            ? new cn(
                (((n = parseInt(n[1], 16)) >> 8) & 15) | ((n >> 4) & 240),
                ((n >> 4) & 15) | (240 & n),
                ((15 & n) << 4) | (15 & n),
                1
              )
            : (n = Qt.exec(t))
            ? on(parseInt(n[1], 16))
            : (n = Kt.exec(t))
            ? new cn(n[1], n[2], n[3], 1)
            : (n = $t.exec(t))
            ? new cn(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                1
              )
            : (n = Jt.exec(t))
            ? sn(n[1], n[2], n[3], n[4])
            : (n = Zt.exec(t))
            ? sn(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                n[4]
              )
            : (n = tn.exec(t))
            ? ln(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = nn.exec(t))
            ? ln(n[1], n[2] / 100, n[3] / 100, n[4])
            : en.hasOwnProperty(t)
            ? on(en[t])
            : "transparent" === t
            ? new cn(NaN, NaN, NaN, 0)
            : null
        );
      }
      function on(t) {
        return new cn((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
      }
      function sn(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new cn(t, n, e, r);
      }
      function un(t) {
        return (
          t instanceof Yt || (t = rn(t)),
          t ? new cn((t = t.rgb()).r, t.g, t.b, t.opacity) : new cn()
        );
      }
      function an(t, n, e, r) {
        return 1 === arguments.length
          ? un(t)
          : new cn(t, n, e, null == r ? 1 : r);
      }
      function cn(t, n, e, r) {
        (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
      }
      function hn(t) {
        return (
          ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16
            ? "0"
            : "") + t.toString(16)
        );
      }
      function ln(t, n, e, r) {
        return (
          r <= 0
            ? (t = n = e = NaN)
            : e <= 0 || e >= 1
            ? (t = n = NaN)
            : n <= 0 && (t = NaN),
          new pn(t, n, e, r)
        );
      }
      function fn(t, n, e, r) {
        return 1 === arguments.length
          ? (function (t) {
              if (t instanceof pn) return new pn(t.h, t.s, t.l, t.opacity);
              if ((t instanceof Yt || (t = rn(t)), !t)) return new pn();
              if (t instanceof pn) return t;
              var n = (t = t.rgb()).r / 255,
                e = t.g / 255,
                r = t.b / 255,
                i = Math.min(n, e, r),
                o = Math.max(n, e, r),
                s = NaN,
                u = o - i,
                a = (o + i) / 2;
              return (
                u
                  ? ((s =
                      n === o
                        ? (e - r) / u + 6 * (e < r)
                        : e === o
                        ? (r - n) / u + 2
                        : (n - e) / u + 4),
                    (u /= a < 0.5 ? o + i : 2 - o - i),
                    (s *= 60))
                  : (u = a > 0 && a < 1 ? 0 : s),
                new pn(s, u, a, t.opacity)
              );
            })(t)
          : new pn(t, n, e, null == r ? 1 : r);
      }
      function pn(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function dn(t, n, e) {
        return (
          255 *
          (t < 60
            ? n + ((e - n) * t) / 60
            : t < 180
            ? e
            : t < 240
            ? n + ((e - n) * (240 - t)) / 60
            : n)
        );
      }
      Gt(Yt, rn, {
        displayable: function () {
          return this.rgb().displayable();
        },
        hex: function () {
          return this.rgb().hex();
        },
        toString: function () {
          return this.rgb() + "";
        },
      }),
        Gt(
          cn,
          an,
          Xt(Yt, {
            brighter: function (t) {
              return (
                (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
                new cn(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? 0.7 : Math.pow(0.7, t)),
                new cn(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            rgb: function () {
              return this;
            },
            displayable: function () {
              return (
                0 <= this.r &&
                this.r <= 255 &&
                0 <= this.g &&
                this.g <= 255 &&
                0 <= this.b &&
                this.b <= 255 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            hex: function () {
              return "#" + hn(this.r) + hn(this.g) + hn(this.b);
            },
            toString: function () {
              var t = this.opacity;
              return (
                (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)))
                  ? "rgb("
                  : "rgba(") +
                Math.max(0, Math.min(255, Math.round(this.r) || 0)) +
                ", " +
                Math.max(0, Math.min(255, Math.round(this.g) || 0)) +
                ", " +
                Math.max(0, Math.min(255, Math.round(this.b) || 0)) +
                (1 === t ? ")" : ", " + t + ")")
              );
            },
          })
        ),
        Gt(
          pn,
          fn,
          Xt(Yt, {
            brighter: function (t) {
              return (
                (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
                new pn(this.h, this.s, this.l * t, this.opacity)
              );
            },
            darker: function (t) {
              return (
                (t = null == t ? 0.7 : Math.pow(0.7, t)),
                new pn(this.h, this.s, this.l * t, this.opacity)
              );
            },
            rgb: function () {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
              return new cn(
                dn(t >= 240 ? t - 240 : t + 120, i, r),
                dn(t, i, r),
                dn(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
              );
            },
            displayable: function () {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
          })
        );
      var vn = Math.PI / 180,
        yn = 180 / Math.PI,
        gn = 0.96422,
        _n = 1,
        mn = 0.82521,
        xn = 4 / 29,
        bn = 6 / 29,
        wn = 3 * bn * bn,
        kn = bn * bn * bn;
      function Mn(t) {
        if (t instanceof Sn) return new Sn(t.l, t.a, t.b, t.opacity);
        if (t instanceof In) {
          if (isNaN(t.h)) return new Sn(t.l, 0, 0, t.opacity);
          var n = t.h * vn;
          return new Sn(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity);
        }
        t instanceof cn || (t = un(t));
        var e,
          r,
          i = Pn(t.r),
          o = Pn(t.g),
          s = Pn(t.b),
          u = An((0.2225045 * i + 0.7168786 * o + 0.0606169 * s) / _n);
        return (
          i === o && o === s
            ? (e = r = u)
            : ((e = An((0.4360747 * i + 0.3850649 * o + 0.1430804 * s) / gn)),
              (r = An((0.0139322 * i + 0.0971045 * o + 0.7141733 * s) / mn))),
          new Sn(116 * u - 16, 500 * (e - u), 200 * (u - r), t.opacity)
        );
      }
      function En(t, n, e, r) {
        return 1 === arguments.length
          ? Mn(t)
          : new Sn(t, n, e, null == r ? 1 : r);
      }
      function Sn(t, n, e, r) {
        (this.l = +t), (this.a = +n), (this.b = +e), (this.opacity = +r);
      }
      function An(t) {
        return t > kn ? Math.pow(t, 1 / 3) : t / wn + xn;
      }
      function On(t) {
        return t > bn ? t * t * t : wn * (t - xn);
      }
      function Nn(t) {
        return (
          255 *
          (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
        );
      }
      function Pn(t) {
        return (t /= 255) <= 0.04045
          ? t / 12.92
          : Math.pow((t + 0.055) / 1.055, 2.4);
      }
      function Tn(t) {
        if (t instanceof In) return new In(t.h, t.c, t.l, t.opacity);
        if ((t instanceof Sn || (t = Mn(t)), 0 === t.a && 0 === t.b))
          return new In(NaN, 0, t.l, t.opacity);
        var n = Math.atan2(t.b, t.a) * yn;
        return new In(
          n < 0 ? n + 360 : n,
          Math.sqrt(t.a * t.a + t.b * t.b),
          t.l,
          t.opacity
        );
      }
      function zn(t, n, e, r) {
        return 1 === arguments.length
          ? Tn(t)
          : new In(t, n, e, null == r ? 1 : r);
      }
      function In(t, n, e, r) {
        (this.h = +t), (this.c = +n), (this.l = +e), (this.opacity = +r);
      }
      Gt(
        Sn,
        En,
        Xt(Yt, {
          brighter: function (t) {
            return new Sn(
              this.l + 18 * (null == t ? 1 : t),
              this.a,
              this.b,
              this.opacity
            );
          },
          darker: function (t) {
            return new Sn(
              this.l - 18 * (null == t ? 1 : t),
              this.a,
              this.b,
              this.opacity
            );
          },
          rgb: function () {
            var t = (this.l + 16) / 116,
              n = isNaN(this.a) ? t : t + this.a / 500,
              e = isNaN(this.b) ? t : t - this.b / 200;
            return new cn(
              Nn(
                3.1338561 * (n = gn * On(n)) -
                  1.6168667 * (t = _n * On(t)) -
                  0.4906146 * (e = mn * On(e))
              ),
              Nn(-0.9787684 * n + 1.9161415 * t + 0.033454 * e),
              Nn(0.0719453 * n - 0.2289914 * t + 1.4052427 * e),
              this.opacity
            );
          },
        })
      ),
        Gt(
          In,
          zn,
          Xt(Yt, {
            brighter: function (t) {
              return new In(
                this.h,
                this.c,
                this.l + 18 * (null == t ? 1 : t),
                this.opacity
              );
            },
            darker: function (t) {
              return new In(
                this.h,
                this.c,
                this.l - 18 * (null == t ? 1 : t),
                this.opacity
              );
            },
            rgb: function () {
              return Mn(this).rgb();
            },
          })
        );
      var Cn = -0.14861,
        Ln = 1.78277,
        jn = -0.29227,
        qn = -0.90649,
        Dn = 1.97294,
        Vn = Dn * qn,
        Bn = Dn * Ln,
        Rn = Ln * jn - qn * Cn;
      function Gn(t, n, e, r) {
        return 1 === arguments.length
          ? (function (t) {
              if (t instanceof Xn) return new Xn(t.h, t.s, t.l, t.opacity);
              t instanceof cn || (t = un(t));
              var n = t.r / 255,
                e = t.g / 255,
                r = t.b / 255,
                i = (Rn * r + Vn * n - Bn * e) / (Rn + Vn - Bn),
                o = r - i,
                s = (Dn * (e - i) - jn * o) / qn,
                u = Math.sqrt(s * s + o * o) / (Dn * i * (1 - i)),
                a = u ? Math.atan2(s, o) * yn - 120 : NaN;
              return new Xn(a < 0 ? a + 360 : a, u, i, t.opacity);
            })(t)
          : new Xn(t, n, e, null == r ? 1 : r);
      }
      function Xn(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function Yn(t, n, e, r, i) {
        var o = t * t,
          s = o * t;
        return (
          ((1 - 3 * t + 3 * o - s) * n +
            (4 - 6 * o + 3 * s) * e +
            (1 + 3 * t + 3 * o - 3 * s) * r +
            s * i) /
          6
        );
      }
      Gt(
        Xn,
        Gn,
        Xt(Yt, {
          brighter: function (t) {
            return (
              (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
              new Xn(this.h, this.s, this.l * t, this.opacity)
            );
          },
          darker: function (t) {
            return (
              (t = null == t ? 0.7 : Math.pow(0.7, t)),
              new Xn(this.h, this.s, this.l * t, this.opacity)
            );
          },
          rgb: function () {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * vn,
              n = +this.l,
              e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
              r = Math.cos(t),
              i = Math.sin(t);
            return new cn(
              255 * (n + e * (Cn * r + Ln * i)),
              255 * (n + e * (jn * r + qn * i)),
              255 * (n + e * (Dn * r)),
              this.opacity
            );
          },
        })
      );
      var Hn = function (t) {
        return function () {
          return t;
        };
      };
      function Fn(t, n) {
        return function (e) {
          return t + e * n;
        };
      }
      function Un(t, n) {
        var e = n - t;
        return e
          ? Fn(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e)
          : Hn(isNaN(t) ? n : t);
      }
      function Wn(t) {
        return 1 == (t = +t)
          ? Qn
          : function (n, e) {
              return e - n
                ? (function (t, n, e) {
                    return (
                      (t = Math.pow(t, e)),
                      (n = Math.pow(n, e) - t),
                      (e = 1 / e),
                      function (r) {
                        return Math.pow(t + r * n, e);
                      }
                    );
                  })(n, e, t)
                : Hn(isNaN(n) ? e : n);
            };
      }
      function Qn(t, n) {
        var e = n - t;
        return e ? Fn(t, e) : Hn(isNaN(t) ? n : t);
      }
      var Kn = (function t(n) {
        var e = Wn(n);
        function r(t, n) {
          var r = e((t = an(t)).r, (n = an(n)).r),
            i = e(t.g, n.g),
            o = e(t.b, n.b),
            s = Qn(t.opacity, n.opacity);
          return function (n) {
            return (
              (t.r = r(n)),
              (t.g = i(n)),
              (t.b = o(n)),
              (t.opacity = s(n)),
              t + ""
            );
          };
        }
        return (r.gamma = t), r;
      })(1);
      function $n(t) {
        return function (n) {
          var e,
            r,
            i = n.length,
            o = new Array(i),
            s = new Array(i),
            u = new Array(i);
          for (e = 0; e < i; ++e)
            (r = an(n[e])),
              (o[e] = r.r || 0),
              (s[e] = r.g || 0),
              (u[e] = r.b || 0);
          return (
            (o = t(o)),
            (s = t(s)),
            (u = t(u)),
            (r.opacity = 1),
            function (t) {
              return (r.r = o(t)), (r.g = s(t)), (r.b = u(t)), r + "";
            }
          );
        };
      }
      $n(function (t) {
        var n = t.length - 1;
        return function (e) {
          var r =
              e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), n - 1) : Math.floor(e * n),
            i = t[r],
            o = t[r + 1],
            s = r > 0 ? t[r - 1] : 2 * i - o,
            u = r < n - 1 ? t[r + 2] : 2 * o - i;
          return Yn((e - r / n) * n, s, i, o, u);
        };
      }),
        $n(function (t) {
          var n = t.length;
          return function (e) {
            var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
              i = t[(r + n - 1) % n],
              o = t[r % n],
              s = t[(r + 1) % n],
              u = t[(r + 2) % n];
            return Yn((e - r / n) * n, i, o, s, u);
          };
        });
      var Jn = function (t, n) {
          return (
            (n -= t = +t),
            function (e) {
              return t + n * e;
            }
          );
        },
        Zn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        te = new RegExp(Zn.source, "g");
      var ne,
        ee,
        re,
        ie,
        oe = function (t, n) {
          var e,
            r,
            i,
            o = (Zn.lastIndex = te.lastIndex = 0),
            s = -1,
            u = [],
            a = [];
          for (t += "", n += ""; (e = Zn.exec(t)) && (r = te.exec(n)); )
            (i = r.index) > o &&
              ((i = n.slice(o, i)), u[s] ? (u[s] += i) : (u[++s] = i)),
              (e = e[0]) === (r = r[0])
                ? u[s]
                  ? (u[s] += r)
                  : (u[++s] = r)
                : ((u[++s] = null), a.push({ i: s, x: Jn(e, r) })),
              (o = te.lastIndex);
          return (
            o < n.length &&
              ((i = n.slice(o)), u[s] ? (u[s] += i) : (u[++s] = i)),
            u.length < 2
              ? a[0]
                ? (function (t) {
                    return function (n) {
                      return t(n) + "";
                    };
                  })(a[0].x)
                : (function (t) {
                    return function () {
                      return t;
                    };
                  })(n)
              : ((n = a.length),
                function (t) {
                  for (var e, r = 0; r < n; ++r) u[(e = a[r]).i] = e.x(t);
                  return u.join("");
                })
          );
        },
        se = 180 / Math.PI,
        ue = {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          skewX: 0,
          scaleX: 1,
          scaleY: 1,
        },
        ae = function (t, n, e, r, i, o) {
          var s, u, a;
          return (
            (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
            (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
            (u = Math.sqrt(e * e + r * r)) && ((e /= u), (r /= u), (a /= u)),
            t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
            {
              translateX: i,
              translateY: o,
              rotate: Math.atan2(n, t) * se,
              skewX: Math.atan(a) * se,
              scaleX: s,
              scaleY: u,
            }
          );
        };
      function ce(t, n, e, r) {
        function i(t) {
          return t.length ? t.pop() + " " : "";
        }
        return function (o, s) {
          var u = [],
            a = [];
          return (
            (o = t(o)),
            (s = t(s)),
            (function (t, r, i, o, s, u) {
              if (t !== i || r !== o) {
                var a = s.push("translate(", null, n, null, e);
                u.push({ i: a - 4, x: Jn(t, i) }, { i: a - 2, x: Jn(r, o) });
              } else (i || o) && s.push("translate(" + i + n + o + e);
            })(o.translateX, o.translateY, s.translateX, s.translateY, u, a),
            (function (t, n, e, o) {
              t !== n
                ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
                  o.push({
                    i: e.push(i(e) + "rotate(", null, r) - 2,
                    x: Jn(t, n),
                  }))
                : n && e.push(i(e) + "rotate(" + n + r);
            })(o.rotate, s.rotate, u, a),
            (function (t, n, e, o) {
              t !== n
                ? o.push({
                    i: e.push(i(e) + "skewX(", null, r) - 2,
                    x: Jn(t, n),
                  })
                : n && e.push(i(e) + "skewX(" + n + r);
            })(o.skewX, s.skewX, u, a),
            (function (t, n, e, r, o, s) {
              if (t !== e || n !== r) {
                var u = o.push(i(o) + "scale(", null, ",", null, ")");
                s.push({ i: u - 4, x: Jn(t, e) }, { i: u - 2, x: Jn(n, r) });
              } else
                (1 === e && 1 === r) ||
                  o.push(i(o) + "scale(" + e + "," + r + ")");
            })(o.scaleX, o.scaleY, s.scaleX, s.scaleY, u, a),
            (o = s = null),
            function (t) {
              for (var n, e = -1, r = a.length; ++e < r; )
                u[(n = a[e]).i] = n.x(t);
              return u.join("");
            }
          );
        };
      }
      var he = ce(
          function (t) {
            return "none" === t
              ? ue
              : (ne ||
                  ((ne = document.createElement("DIV")),
                  (ee = document.documentElement),
                  (re = document.defaultView)),
                (ne.style.transform = t),
                (t = re
                  .getComputedStyle(ee.appendChild(ne), null)
                  .getPropertyValue("transform")),
                ee.removeChild(ne),
                (t = t.slice(7, -1).split(",")),
                ae(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]));
          },
          "px, ",
          "px)",
          "deg)"
        ),
        le = ce(
          function (t) {
            return null == t
              ? ue
              : (ie ||
                  (ie = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                  )),
                ie.setAttribute("transform", t),
                (t = ie.transform.baseVal.consolidate())
                  ? ((t = t.matrix), ae(t.a, t.b, t.c, t.d, t.e, t.f))
                  : ue);
          },
          ", ",
          ")",
          ")"
        ),
        fe = Math.SQRT2;
      function pe(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2;
      }
      var de = function (t, n) {
        var e,
          r,
          i = t[0],
          o = t[1],
          s = t[2],
          u = n[0],
          a = n[1],
          c = n[2],
          h = u - i,
          l = a - o,
          f = h * h + l * l;
        if (f < 1e-12)
          (r = Math.log(c / s) / fe),
            (e = function (t) {
              return [i + t * h, o + t * l, s * Math.exp(fe * t * r)];
            });
        else {
          var p = Math.sqrt(f),
            d = (c * c - s * s + 4 * f) / (2 * s * 2 * p),
            v = (c * c - s * s - 4 * f) / (2 * c * 2 * p),
            y = Math.log(Math.sqrt(d * d + 1) - d),
            g = Math.log(Math.sqrt(v * v + 1) - v);
          (r = (g - y) / fe),
            (e = function (t) {
              var n,
                e = t * r,
                u = pe(y),
                a =
                  (s / (2 * p)) *
                  (u *
                    ((n = fe * e + y), ((n = Math.exp(2 * n)) - 1) / (n + 1)) -
                    (function (t) {
                      return ((t = Math.exp(t)) - 1 / t) / 2;
                    })(y));
              return [i + a * h, o + a * l, (s * u) / pe(fe * e + y)];
            });
        }
        return (e.duration = 1e3 * r), e;
      };
      function ve(t) {
        return function (n, e) {
          var r = t((n = fn(n)).h, (e = fn(e)).h),
            i = Qn(n.s, e.s),
            o = Qn(n.l, e.l),
            s = Qn(n.opacity, e.opacity);
          return function (t) {
            return (
              (n.h = r(t)),
              (n.s = i(t)),
              (n.l = o(t)),
              (n.opacity = s(t)),
              n + ""
            );
          };
        };
      }
      ve(Un), ve(Qn);
      function ye(t) {
        return function (n, e) {
          var r = t((n = zn(n)).h, (e = zn(e)).h),
            i = Qn(n.c, e.c),
            o = Qn(n.l, e.l),
            s = Qn(n.opacity, e.opacity);
          return function (t) {
            return (
              (n.h = r(t)),
              (n.c = i(t)),
              (n.l = o(t)),
              (n.opacity = s(t)),
              n + ""
            );
          };
        };
      }
      ye(Un), ye(Qn);
      function ge(t) {
        return (function n(e) {
          function r(n, r) {
            var i = t((n = Gn(n)).h, (r = Gn(r)).h),
              o = Qn(n.s, r.s),
              s = Qn(n.l, r.l),
              u = Qn(n.opacity, r.opacity);
            return function (t) {
              return (
                (n.h = i(t)),
                (n.s = o(t)),
                (n.l = s(Math.pow(t, e))),
                (n.opacity = u(t)),
                n + ""
              );
            };
          }
          return (e = +e), (r.gamma = n), r;
        })(1);
      }
      ge(Un), ge(Qn);
      function _e(t, n, e) {
        var r = t._id;
        return (
          t.each(function () {
            var t = Vt(this, r);
            (t.value || (t.value = {}))[n] = e.apply(this, arguments);
          }),
          function (t) {
            return Bt(t, r).value[n];
          }
        );
      }
      var me = function (t, n) {
        var e;
        return ("number" == typeof n
          ? Jn
          : n instanceof rn
          ? Kn
          : (e = rn(n))
          ? ((n = e), Kn)
          : oe)(t, n);
      };
      var xe = Q.prototype.constructor;
      var be = 0;
      function we(t, n, e, r) {
        (this._groups = t),
          (this._parents = n),
          (this._name = e),
          (this._id = r);
      }
      function ke(t) {
        return Q().transition(t);
      }
      function Me() {
        return ++be;
      }
      var Ee = Q.prototype;
      function Se(t) {
        return +t;
      }
      function Ae(t) {
        return t * t;
      }
      function Oe(t) {
        return t * (2 - t);
      }
      function Ne(t) {
        return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
      }
      function Pe(t) {
        return t * t * t;
      }
      function Te(t) {
        return --t * t * t + 1;
      }
      function ze(t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
      }
      we.prototype = ke.prototype = {
        constructor: we,
        select: function (t) {
          var n = this._name,
            e = this._id;
          "function" != typeof t && (t = h(t));
          for (
            var r = this._groups, i = r.length, o = new Array(i), s = 0;
            s < i;
            ++s
          )
            for (
              var u,
                a,
                c = r[s],
                l = c.length,
                f = (o[s] = new Array(l)),
                p = 0;
              p < l;
              ++p
            )
              (u = c[p]) &&
                (a = t.call(u, u.__data__, p, c)) &&
                ("__data__" in u && (a.__data__ = u.__data__),
                (f[p] = a),
                qt(f[p], n, e, p, f, Bt(u, e)));
          return new we(o, this._parents, n, e);
        },
        selectAll: function (t) {
          var n = this._name,
            e = this._id;
          "function" != typeof t && (t = f(t));
          for (
            var r = this._groups, i = r.length, o = [], s = [], u = 0;
            u < i;
            ++u
          )
            for (var a, c = r[u], h = c.length, l = 0; l < h; ++l)
              if ((a = c[l])) {
                for (
                  var p,
                    d = t.call(a, a.__data__, l, c),
                    v = Bt(a, e),
                    y = 0,
                    g = d.length;
                  y < g;
                  ++y
                )
                  (p = d[y]) && qt(p, n, e, y, d, v);
                o.push(d), s.push(a);
              }
          return new we(o, s, n, e);
        },
        filter: function (t) {
          "function" != typeof t && (t = y(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o, s = n[i], u = s.length, a = (r[i] = []), c = 0;
              c < u;
              ++c
            )
              (o = s[c]) && t.call(o, o.__data__, c, s) && a.push(o);
          return new we(r, this._parents, this._name, this._id);
        },
        merge: function (t) {
          if (t._id !== this._id) throw new Error();
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              o = Math.min(r, i),
              s = new Array(r),
              u = 0;
            u < o;
            ++u
          )
            for (
              var a,
                c = n[u],
                h = e[u],
                l = c.length,
                f = (s[u] = new Array(l)),
                p = 0;
              p < l;
              ++p
            )
              (a = c[p] || h[p]) && (f[p] = a);
          for (; u < r; ++u) s[u] = n[u];
          return new we(s, this._parents, this._name, this._id);
        },
        selection: function () {
          return new xe(this._groups, this._parents);
        },
        transition: function () {
          for (
            var t = this._name,
              n = this._id,
              e = Me(),
              r = this._groups,
              i = r.length,
              o = 0;
            o < i;
            ++o
          )
            for (var s, u = r[o], a = u.length, c = 0; c < a; ++c)
              if ((s = u[c])) {
                var h = Bt(s, n);
                qt(s, t, e, c, u, {
                  time: h.time + h.delay + h.duration,
                  delay: 0,
                  duration: h.duration,
                  ease: h.ease,
                });
              }
          return new we(r, this._parents, t, e);
        },
        call: Ee.call,
        nodes: Ee.nodes,
        node: Ee.node,
        size: Ee.size,
        empty: Ee.empty,
        each: Ee.each,
        on: function (t, n) {
          var e = this._id;
          return arguments.length < 2
            ? Bt(this.node(), e).on.on(t)
            : this.each(
                (function (t, n, e) {
                  var r,
                    i,
                    o = (function (t) {
                      return (t + "")
                        .trim()
                        .split(/^|\s+/)
                        .every(function (t) {
                          var n = t.indexOf(".");
                          return (
                            n >= 0 && (t = t.slice(0, n)), !t || "start" === t
                          );
                        });
                    })(n)
                      ? Dt
                      : Vt;
                  return function () {
                    var s = o(this, t),
                      u = s.on;
                    u !== r && (i = (r = u).copy()).on(n, e), (s.on = i);
                  };
                })(e, t, n)
              );
        },
        attr: function (t, n) {
          var e = u(t),
            r = "transform" === e ? le : me;
          return this.attrTween(
            t,
            "function" == typeof n
              ? (e.local
                  ? function (t, n, e) {
                      var r, i, o;
                      return function () {
                        var s,
                          u = e(this);
                        if (null != u)
                          return (s = this.getAttributeNS(t.space, t.local)) ===
                            u
                            ? null
                            : s === r && u === i
                            ? o
                            : (o = n((r = s), (i = u)));
                        this.removeAttributeNS(t.space, t.local);
                      };
                    }
                  : function (t, n, e) {
                      var r, i, o;
                      return function () {
                        var s,
                          u = e(this);
                        if (null != u)
                          return (s = this.getAttribute(t)) === u
                            ? null
                            : s === r && u === i
                            ? o
                            : (o = n((r = s), (i = u)));
                        this.removeAttribute(t);
                      };
                    })(e, r, _e(this, "attr." + t, n))
              : null == n
              ? (e.local
                  ? function (t) {
                      return function () {
                        this.removeAttributeNS(t.space, t.local);
                      };
                    }
                  : function (t) {
                      return function () {
                        this.removeAttribute(t);
                      };
                    })(e)
              : (e.local
                  ? function (t, n, e) {
                      var r, i;
                      return function () {
                        var o = this.getAttributeNS(t.space, t.local);
                        return o === e
                          ? null
                          : o === r
                          ? i
                          : (i = n((r = o), e));
                      };
                    }
                  : function (t, n, e) {
                      var r, i;
                      return function () {
                        var o = this.getAttribute(t);
                        return o === e
                          ? null
                          : o === r
                          ? i
                          : (i = n((r = o), e));
                      };
                    })(e, r, n + "")
          );
        },
        attrTween: function (t, n) {
          var e = "attr." + t;
          if (arguments.length < 2) return (e = this.tween(e)) && e._value;
          if (null == n) return this.tween(e, null);
          if ("function" != typeof n) throw new Error();
          var r = u(t);
          return this.tween(
            e,
            (r.local
              ? function (t, n) {
                  function e() {
                    var e = this,
                      r = n.apply(e, arguments);
                    return (
                      r &&
                      function (n) {
                        e.setAttributeNS(t.space, t.local, r(n));
                      }
                    );
                  }
                  return (e._value = n), e;
                }
              : function (t, n) {
                  function e() {
                    var e = this,
                      r = n.apply(e, arguments);
                    return (
                      r &&
                      function (n) {
                        e.setAttribute(t, r(n));
                      }
                    );
                  }
                  return (e._value = n), e;
                })(r, n)
          );
        },
        style: function (t, n, e) {
          var r = "transform" == (t += "") ? he : me;
          return null == n
            ? this.styleTween(
                t,
                (function (t, n) {
                  var e, r, i;
                  return function () {
                    var o = M(this, t),
                      s = (this.style.removeProperty(t), M(this, t));
                    return o === s
                      ? null
                      : o === e && s === r
                      ? i
                      : (i = n((e = o), (r = s)));
                  };
                })(t, r)
              ).on(
                "end.style." + t,
                (function (t) {
                  return function () {
                    this.style.removeProperty(t);
                  };
                })(t)
              )
            : this.styleTween(
                t,
                "function" == typeof n
                  ? (function (t, n, e) {
                      var r, i, o;
                      return function () {
                        var s = M(this, t),
                          u = e(this);
                        return (
                          null == u &&
                            (this.style.removeProperty(t), (u = M(this, t))),
                          s === u
                            ? null
                            : s === r && u === i
                            ? o
                            : (o = n((r = s), (i = u)))
                        );
                      };
                    })(t, r, _e(this, "style." + t, n))
                  : (function (t, n, e) {
                      var r, i;
                      return function () {
                        var o = M(this, t);
                        return o === e
                          ? null
                          : o === r
                          ? i
                          : (i = n((r = o), e));
                      };
                    })(t, r, n + ""),
                e
              );
        },
        styleTween: function (t, n, e) {
          var r = "style." + (t += "");
          if (arguments.length < 2) return (r = this.tween(r)) && r._value;
          if (null == n) return this.tween(r, null);
          if ("function" != typeof n) throw new Error();
          return this.tween(
            r,
            (function (t, n, e) {
              function r() {
                var r = this,
                  i = n.apply(r, arguments);
                return (
                  i &&
                  function (n) {
                    r.style.setProperty(t, i(n), e);
                  }
                );
              }
              return (r._value = n), r;
            })(t, n, null == e ? "" : e)
          );
        },
        text: function (t) {
          return this.tween(
            "text",
            "function" == typeof t
              ? (function (t) {
                  return function () {
                    var n = t(this);
                    this.textContent = null == n ? "" : n;
                  };
                })(_e(this, "text", t))
              : (function (t) {
                  return function () {
                    this.textContent = t;
                  };
                })(null == t ? "" : t + "")
          );
        },
        remove: function () {
          return this.on(
            "end.remove",
            ((t = this._id),
            function () {
              var n = this.parentNode;
              for (var e in this.__transition) if (+e !== t) return;
              n && n.removeChild(this);
            })
          );
          var t;
        },
        tween: function (t, n) {
          var e = this._id;
          if (((t += ""), arguments.length < 2)) {
            for (
              var r, i = Bt(this.node(), e).tween, o = 0, s = i.length;
              o < s;
              ++o
            )
              if ((r = i[o]).name === t) return r.value;
            return null;
          }
          return this.each(
            (null == n
              ? function (t, n) {
                  var e, r;
                  return function () {
                    var i = Vt(this, t),
                      o = i.tween;
                    if (o !== e)
                      for (var s = 0, u = (r = e = o).length; s < u; ++s)
                        if (r[s].name === n) {
                          (r = r.slice()).splice(s, 1);
                          break;
                        }
                    i.tween = r;
                  };
                }
              : function (t, n, e) {
                  var r, i;
                  if ("function" != typeof e) throw new Error();
                  return function () {
                    var o = Vt(this, t),
                      s = o.tween;
                    if (s !== r) {
                      i = (r = s).slice();
                      for (
                        var u = { name: n, value: e }, a = 0, c = i.length;
                        a < c;
                        ++a
                      )
                        if (i[a].name === n) {
                          i[a] = u;
                          break;
                        }
                      a === c && i.push(u);
                    }
                    o.tween = i;
                  };
                })(e, t, n)
          );
        },
        delay: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(
                ("function" == typeof t
                  ? function (t, n) {
                      return function () {
                        Dt(this, t).delay = +n.apply(this, arguments);
                      };
                    }
                  : function (t, n) {
                      return (
                        (n = +n),
                        function () {
                          Dt(this, t).delay = n;
                        }
                      );
                    })(n, t)
              )
            : Bt(this.node(), n).delay;
        },
        duration: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(
                ("function" == typeof t
                  ? function (t, n) {
                      return function () {
                        Vt(this, t).duration = +n.apply(this, arguments);
                      };
                    }
                  : function (t, n) {
                      return (
                        (n = +n),
                        function () {
                          Vt(this, t).duration = n;
                        }
                      );
                    })(n, t)
              )
            : Bt(this.node(), n).duration;
        },
        ease: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(
                (function (t, n) {
                  if ("function" != typeof n) throw new Error();
                  return function () {
                    Vt(this, t).ease = n;
                  };
                })(n, t)
              )
            : Bt(this.node(), n).ease;
        },
      };
      var Ie = (function t(n) {
          function e(t) {
            return Math.pow(t, n);
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        Ce = (function t(n) {
          function e(t) {
            return 1 - Math.pow(1 - t, n);
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        Le = (function t(n) {
          function e(t) {
            return (
              ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2
            );
          }
          return (n = +n), (e.exponent = t), e;
        })(3),
        je = Math.PI,
        qe = je / 2;
      function De(t) {
        return 1 - Math.cos(t * qe);
      }
      function Ve(t) {
        return Math.sin(t * qe);
      }
      function Be(t) {
        return (1 - Math.cos(je * t)) / 2;
      }
      function Re(t) {
        return Math.pow(2, 10 * t - 10);
      }
      function Ge(t) {
        return 1 - Math.pow(2, -10 * t);
      }
      function Xe(t) {
        return (
          ((t *= 2) <= 1
            ? Math.pow(2, 10 * t - 10)
            : 2 - Math.pow(2, 10 - 10 * t)) / 2
        );
      }
      function Ye(t) {
        return 1 - Math.sqrt(1 - t * t);
      }
      function He(t) {
        return Math.sqrt(1 - --t * t);
      }
      function Fe(t) {
        return (
          ((t *= 2) <= 1
            ? 1 - Math.sqrt(1 - t * t)
            : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
        );
      }
      var Ue = 4 / 11,
        We = 6 / 11,
        Qe = 8 / 11,
        Ke = 0.75,
        $e = 9 / 11,
        Je = 10 / 11,
        Ze = 0.9375,
        tr = 21 / 22,
        nr = 63 / 64,
        er = 1 / Ue / Ue;
      function rr(t) {
        return 1 - ir(1 - t);
      }
      function ir(t) {
        return (t = +t) < Ue
          ? er * t * t
          : t < Qe
          ? er * (t -= We) * t + Ke
          : t < Je
          ? er * (t -= $e) * t + Ze
          : er * (t -= tr) * t + nr;
      }
      function or(t) {
        return ((t *= 2) <= 1 ? 1 - ir(1 - t) : ir(t - 1) + 1) / 2;
      }
      var sr = (function t(n) {
          function e(t) {
            return t * t * ((n + 1) * t - n);
          }
          return (n = +n), (e.overshoot = t), e;
        })(1.70158),
        ur = (function t(n) {
          function e(t) {
            return --t * t * ((n + 1) * t + n) + 1;
          }
          return (n = +n), (e.overshoot = t), e;
        })(1.70158),
        ar = (function t(n) {
          function e(t) {
            return (
              ((t *= 2) < 1
                ? t * t * ((n + 1) * t - n)
                : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2
            );
          }
          return (n = +n), (e.overshoot = t), e;
        })(1.70158),
        cr = 2 * Math.PI,
        hr = (function t(n, e) {
          var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= cr);
          function i(t) {
            return n * Math.pow(2, 10 * --t) * Math.sin((r - t) / e);
          }
          return (
            (i.amplitude = function (n) {
              return t(n, e * cr);
            }),
            (i.period = function (e) {
              return t(n, e);
            }),
            i
          );
        })(1, 0.3),
        lr = (function t(n, e) {
          var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= cr);
          function i(t) {
            return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / e);
          }
          return (
            (i.amplitude = function (n) {
              return t(n, e * cr);
            }),
            (i.period = function (e) {
              return t(n, e);
            }),
            i
          );
        })(1, 0.3),
        fr = (function t(n, e) {
          var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= cr);
          function i(t) {
            return (
              ((t = 2 * t - 1) < 0
                ? n * Math.pow(2, 10 * t) * Math.sin((r - t) / e)
                : 2 - n * Math.pow(2, -10 * t) * Math.sin((r + t) / e)) / 2
            );
          }
          return (
            (i.amplitude = function (n) {
              return t(n, e * cr);
            }),
            (i.period = function (e) {
              return t(n, e);
            }),
            i
          );
        })(1, 0.3),
        pr = { time: null, delay: 0, duration: 250, ease: ze };
      function dr(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]); )
          if (!(t = t.parentNode)) return (pr.time = xt()), pr;
        return e;
      }
      (Q.prototype.interrupt = function (t) {
        return this.each(function () {
          Rt(this, t);
        });
      }),
        (Q.prototype.transition = function (t) {
          var n, e;
          t instanceof we
            ? ((n = t._id), (t = t._name))
            : ((n = Me()),
              ((e = pr).time = xt()),
              (t = null == t ? null : t + ""));
          for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
            for (var s, u = r[o], a = u.length, c = 0; c < a; ++c)
              (s = u[c]) && qt(s, t, n, c, u, e || dr(s, n));
          return new we(r, this._parents, t, n);
        });
      function vr() {
        V.stopImmediatePropagation();
      }
      var yr = function () {
          V.preventDefault(), V.stopImmediatePropagation();
        },
        gr = function (t) {
          var n = t.document.documentElement,
            e = K(t).on("dragstart.drag", yr, !0);
          "onselectstart" in n
            ? e.on("selectstart.drag", yr, !0)
            : ((n.__noselect = n.style.MozUserSelect),
              (n.style.MozUserSelect = "none"));
        };
      function _r(t, n) {
        var e = t.document.documentElement,
          r = K(t).on("dragstart.drag", null);
        n &&
          (r.on("click.drag", yr, !0),
          setTimeout(function () {
            r.on("click.drag", null);
          }, 0)),
          "onselectstart" in e
            ? r.on("selectstart.drag", null)
            : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
      }
      var mr = function (t) {
        return function () {
          return t;
        };
      };
      function xr(t, n, e, r, i, o, s, u, a, c) {
        (this.target = t),
          (this.type = n),
          (this.subject = e),
          (this.identifier = r),
          (this.active = i),
          (this.x = o),
          (this.y = s),
          (this.dx = u),
          (this.dy = a),
          (this._ = c);
      }
      function br() {
        return !V.button;
      }
      function wr() {
        return this.parentNode;
      }
      function kr(t) {
        return null == t ? { x: V.x, y: V.y } : t;
      }
      function Mr() {
        return "ontouchstart" in this;
      }
      xr.prototype.on = function () {
        var t = this._.on.apply(this._, arguments);
        return t === this._ ? this : t;
      };
      var Er = function () {
          var t,
            n,
            e,
            r,
            i = br,
            o = wr,
            s = kr,
            u = Mr,
            a = {},
            c = ht("start", "drag", "end"),
            h = 0,
            l = 0;
          function f(t) {
            t.on("mousedown.drag", p)
              .filter(u)
              .on("touchstart.drag", y)
              .on("touchmove.drag", g)
              .on("touchend.drag touchcancel.drag", _)
              .style("touch-action", "none")
              .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
          }
          function p() {
            if (!r && i.apply(this, arguments)) {
              var s = m("mouse", o.apply(this, arguments), nt, this, arguments);
              s &&
                (K(V.view)
                  .on("mousemove.drag", d, !0)
                  .on("mouseup.drag", v, !0),
                gr(V.view),
                vr(),
                (e = !1),
                (t = V.clientX),
                (n = V.clientY),
                s("start"));
            }
          }
          function d() {
            if ((yr(), !e)) {
              var r = V.clientX - t,
                i = V.clientY - n;
              e = r * r + i * i > l;
            }
            a.mouse("drag");
          }
          function v() {
            K(V.view).on("mousemove.drag mouseup.drag", null),
              _r(V.view, e),
              yr(),
              a.mouse("end");
          }
          function y() {
            if (i.apply(this, arguments)) {
              var t,
                n,
                e = V.changedTouches,
                r = o.apply(this, arguments),
                s = e.length;
              for (t = 0; t < s; ++t)
                (n = m(e[t].identifier, r, et, this, arguments)) &&
                  (vr(), n("start"));
            }
          }
          function g() {
            var t,
              n,
              e = V.changedTouches,
              r = e.length;
            for (t = 0; t < r; ++t)
              (n = a[e[t].identifier]) && (yr(), n("drag"));
          }
          function _() {
            var t,
              n,
              e = V.changedTouches,
              i = e.length;
            for (
              r && clearTimeout(r),
                r = setTimeout(function () {
                  r = null;
                }, 500),
                t = 0;
              t < i;
              ++t
            )
              (n = a[e[t].identifier]) && (vr(), n("end"));
          }
          function m(t, n, e, r, i) {
            var o,
              u,
              l,
              p = e(n, t),
              d = c.copy();
            if (
              Y(
                new xr(f, "beforestart", o, t, h, p[0], p[1], 0, 0, d),
                function () {
                  return (
                    null != (V.subject = o = s.apply(r, i)) &&
                    ((u = o.x - p[0] || 0), (l = o.y - p[1] || 0), !0)
                  );
                }
              )
            )
              return function s(c) {
                var v,
                  y = p;
                switch (c) {
                  case "start":
                    (a[t] = s), (v = h++);
                    break;
                  case "end":
                    delete a[t], --h;
                  case "drag":
                    (p = e(n, t)), (v = h);
                }
                Y(
                  new xr(
                    f,
                    c,
                    o,
                    t,
                    v,
                    p[0] + u,
                    p[1] + l,
                    p[0] - y[0],
                    p[1] - y[1],
                    d
                  ),
                  d.apply,
                  d,
                  [c, r, i]
                );
              };
          }
          return (
            (f.filter = function (t) {
              return arguments.length
                ? ((i = "function" == typeof t ? t : mr(!!t)), f)
                : i;
            }),
            (f.container = function (t) {
              return arguments.length
                ? ((o = "function" == typeof t ? t : mr(t)), f)
                : o;
            }),
            (f.subject = function (t) {
              return arguments.length
                ? ((s = "function" == typeof t ? t : mr(t)), f)
                : s;
            }),
            (f.touchable = function (t) {
              return arguments.length
                ? ((u = "function" == typeof t ? t : mr(!!t)), f)
                : u;
            }),
            (f.on = function () {
              var t = c.on.apply(c, arguments);
              return t === c ? f : t;
            }),
            (f.clickDistance = function (t) {
              return arguments.length ? ((l = (t = +t) * t), f) : Math.sqrt(l);
            }),
            f
          );
        },
        Sr = Math.PI,
        Ar = 2 * Sr,
        Or = Ar - 1e-6;
      function Nr() {
        (this._x0 = this._y0 = this._x1 = this._y1 = null), (this._ = "");
      }
      function Pr() {
        return new Nr();
      }
      Nr.prototype = Pr.prototype = {
        constructor: Nr,
        moveTo: function (t, n) {
          this._ +=
            "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n);
        },
        closePath: function () {
          null !== this._x1 &&
            ((this._x1 = this._x0), (this._y1 = this._y0), (this._ += "Z"));
        },
        lineTo: function (t, n) {
          this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n);
        },
        quadraticCurveTo: function (t, n, e, r) {
          this._ +=
            "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r);
        },
        bezierCurveTo: function (t, n, e, r, i, o) {
          this._ +=
            "C" +
            +t +
            "," +
            +n +
            "," +
            +e +
            "," +
            +r +
            "," +
            (this._x1 = +i) +
            "," +
            (this._y1 = +o);
        },
        arcTo: function (t, n, e, r, i) {
          (t = +t), (n = +n), (e = +e), (r = +r), (i = +i);
          var o = this._x1,
            s = this._y1,
            u = e - t,
            a = r - n,
            c = o - t,
            h = s - n,
            l = c * c + h * h;
          if (i < 0) throw new Error("negative radius: " + i);
          if (null === this._x1)
            this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
          else if (l > 1e-6)
            if (Math.abs(h * u - a * c) > 1e-6 && i) {
              var f = e - o,
                p = r - s,
                d = u * u + a * a,
                v = f * f + p * p,
                y = Math.sqrt(d),
                g = Math.sqrt(l),
                _ =
                  i * Math.tan((Sr - Math.acos((d + l - v) / (2 * y * g))) / 2),
                m = _ / g,
                x = _ / y;
              Math.abs(m - 1) > 1e-6 &&
                (this._ += "L" + (t + m * c) + "," + (n + m * h)),
                (this._ +=
                  "A" +
                  i +
                  "," +
                  i +
                  ",0,0," +
                  +(h * f > c * p) +
                  "," +
                  (this._x1 = t + x * u) +
                  "," +
                  (this._y1 = n + x * a));
            } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
          else;
        },
        arc: function (t, n, e, r, i, o) {
          (t = +t), (n = +n);
          var s = (e = +e) * Math.cos(r),
            u = e * Math.sin(r),
            a = t + s,
            c = n + u,
            h = 1 ^ o,
            l = o ? r - i : i - r;
          if (e < 0) throw new Error("negative radius: " + e);
          null === this._x1
            ? (this._ += "M" + a + "," + c)
            : (Math.abs(this._x1 - a) > 1e-6 ||
                Math.abs(this._y1 - c) > 1e-6) &&
              (this._ += "L" + a + "," + c),
            e &&
              (l < 0 && (l = (l % Ar) + Ar),
              l > Or
                ? (this._ +=
                    "A" +
                    e +
                    "," +
                    e +
                    ",0,1," +
                    h +
                    "," +
                    (t - s) +
                    "," +
                    (n - u) +
                    "A" +
                    e +
                    "," +
                    e +
                    ",0,1," +
                    h +
                    "," +
                    (this._x1 = a) +
                    "," +
                    (this._y1 = c))
                : l > 1e-6 &&
                  (this._ +=
                    "A" +
                    e +
                    "," +
                    e +
                    ",0," +
                    +(l >= Sr) +
                    "," +
                    h +
                    "," +
                    (this._x1 = t + e * Math.cos(i)) +
                    "," +
                    (this._y1 = n + e * Math.sin(i))));
        },
        rect: function (t, n, e, r) {
          this._ +=
            "M" +
            (this._x0 = this._x1 = +t) +
            "," +
            (this._y0 = this._y1 = +n) +
            "h" +
            +e +
            "v" +
            +r +
            "h" +
            -e +
            "Z";
        },
        toString: function () {
          return this._;
        },
      };
      var Tr = Pr,
        zr = function (t) {
          return function () {
            return t;
          };
        },
        Ir = Math.abs,
        Cr = Math.atan2,
        Lr = Math.cos,
        jr = Math.max,
        qr = Math.min,
        Dr = Math.sin,
        Vr = Math.sqrt,
        Br = 1e-12,
        Rr = Math.PI,
        Gr = Rr / 2,
        Xr = 2 * Rr;
      function Yr(t) {
        return t >= 1 ? Gr : t <= -1 ? -Gr : Math.asin(t);
      }
      function Hr(t) {
        return t.innerRadius;
      }
      function Fr(t) {
        return t.outerRadius;
      }
      function Ur(t) {
        return t.startAngle;
      }
      function Wr(t) {
        return t.endAngle;
      }
      function Qr(t) {
        return t && t.padAngle;
      }
      function Kr(t, n, e, r, i, o, s) {
        var u = t - e,
          a = n - r,
          c = (s ? o : -o) / Vr(u * u + a * a),
          h = c * a,
          l = -c * u,
          f = t + h,
          p = n + l,
          d = e + h,
          v = r + l,
          y = (f + d) / 2,
          g = (p + v) / 2,
          _ = d - f,
          m = v - p,
          x = _ * _ + m * m,
          b = i - o,
          w = f * v - d * p,
          k = (m < 0 ? -1 : 1) * Vr(jr(0, b * b * x - w * w)),
          M = (w * m - _ * k) / x,
          E = (-w * _ - m * k) / x,
          S = (w * m + _ * k) / x,
          A = (-w * _ + m * k) / x,
          O = M - y,
          N = E - g,
          P = S - y,
          T = A - g;
        return (
          O * O + N * N > P * P + T * T && ((M = S), (E = A)),
          {
            cx: M,
            cy: E,
            x01: -h,
            y01: -l,
            x11: M * (i / b - 1),
            y11: E * (i / b - 1),
          }
        );
      }
      var $r = function () {
        var t = Hr,
          n = Fr,
          e = zr(0),
          r = null,
          i = Ur,
          o = Wr,
          s = Qr,
          u = null;
        function a() {
          var a,
            c,
            h,
            l = +t.apply(this, arguments),
            f = +n.apply(this, arguments),
            p = i.apply(this, arguments) - Gr,
            d = o.apply(this, arguments) - Gr,
            v = Ir(d - p),
            y = d > p;
          if (
            (u || (u = a = Tr()), f < l && ((c = f), (f = l), (l = c)), f > Br)
          )
            if (v > Xr - Br)
              u.moveTo(f * Lr(p), f * Dr(p)),
                u.arc(0, 0, f, p, d, !y),
                l > Br &&
                  (u.moveTo(l * Lr(d), l * Dr(d)), u.arc(0, 0, l, d, p, y));
            else {
              var g,
                _,
                m = p,
                x = d,
                b = p,
                w = d,
                k = v,
                M = v,
                E = s.apply(this, arguments) / 2,
                S =
                  E > Br && (r ? +r.apply(this, arguments) : Vr(l * l + f * f)),
                A = qr(Ir(f - l) / 2, +e.apply(this, arguments)),
                O = A,
                N = A;
              if (S > Br) {
                var P = Yr((S / l) * Dr(E)),
                  T = Yr((S / f) * Dr(E));
                (k -= 2 * P) > Br
                  ? ((b += P *= y ? 1 : -1), (w -= P))
                  : ((k = 0), (b = w = (p + d) / 2)),
                  (M -= 2 * T) > Br
                    ? ((m += T *= y ? 1 : -1), (x -= T))
                    : ((M = 0), (m = x = (p + d) / 2));
              }
              var z = f * Lr(m),
                I = f * Dr(m),
                C = l * Lr(w),
                L = l * Dr(w);
              if (A > Br) {
                var j = f * Lr(x),
                  q = f * Dr(x),
                  D = l * Lr(b),
                  V = l * Dr(b);
                if (v < Rr) {
                  var B =
                      k > Br
                        ? (function (t, n, e, r, i, o, s, u) {
                            var a = e - t,
                              c = r - n,
                              h = s - i,
                              l = u - o,
                              f = (h * (n - o) - l * (t - i)) / (l * a - h * c);
                            return [t + f * a, n + f * c];
                          })(z, I, D, V, j, q, C, L)
                        : [C, L],
                    R = z - B[0],
                    G = I - B[1],
                    X = j - B[0],
                    Y = q - B[1],
                    H =
                      1 /
                      Dr(
                        ((h =
                          (R * X + G * Y) /
                          (Vr(R * R + G * G) * Vr(X * X + Y * Y))) > 1
                          ? 0
                          : h < -1
                          ? Rr
                          : Math.acos(h)) / 2
                      ),
                    F = Vr(B[0] * B[0] + B[1] * B[1]);
                  (O = qr(A, (l - F) / (H - 1))),
                    (N = qr(A, (f - F) / (H + 1)));
                }
              }
              M > Br
                ? N > Br
                  ? ((g = Kr(D, V, z, I, f, N, y)),
                    (_ = Kr(j, q, C, L, f, N, y)),
                    u.moveTo(g.cx + g.x01, g.cy + g.y01),
                    N < A
                      ? u.arc(
                          g.cx,
                          g.cy,
                          N,
                          Cr(g.y01, g.x01),
                          Cr(_.y01, _.x01),
                          !y
                        )
                      : (u.arc(
                          g.cx,
                          g.cy,
                          N,
                          Cr(g.y01, g.x01),
                          Cr(g.y11, g.x11),
                          !y
                        ),
                        u.arc(
                          0,
                          0,
                          f,
                          Cr(g.cy + g.y11, g.cx + g.x11),
                          Cr(_.cy + _.y11, _.cx + _.x11),
                          !y
                        ),
                        u.arc(
                          _.cx,
                          _.cy,
                          N,
                          Cr(_.y11, _.x11),
                          Cr(_.y01, _.x01),
                          !y
                        )))
                  : (u.moveTo(z, I), u.arc(0, 0, f, m, x, !y))
                : u.moveTo(z, I),
                l > Br && k > Br
                  ? O > Br
                    ? ((g = Kr(C, L, j, q, l, -O, y)),
                      (_ = Kr(z, I, D, V, l, -O, y)),
                      u.lineTo(g.cx + g.x01, g.cy + g.y01),
                      O < A
                        ? u.arc(
                            g.cx,
                            g.cy,
                            O,
                            Cr(g.y01, g.x01),
                            Cr(_.y01, _.x01),
                            !y
                          )
                        : (u.arc(
                            g.cx,
                            g.cy,
                            O,
                            Cr(g.y01, g.x01),
                            Cr(g.y11, g.x11),
                            !y
                          ),
                          u.arc(
                            0,
                            0,
                            l,
                            Cr(g.cy + g.y11, g.cx + g.x11),
                            Cr(_.cy + _.y11, _.cx + _.x11),
                            y
                          ),
                          u.arc(
                            _.cx,
                            _.cy,
                            O,
                            Cr(_.y11, _.x11),
                            Cr(_.y01, _.x01),
                            !y
                          )))
                    : u.arc(0, 0, l, w, b, y)
                  : u.lineTo(C, L);
            }
          else u.moveTo(0, 0);
          if ((u.closePath(), a)) return (u = null), a + "" || null;
        }
        return (
          (a.centroid = function () {
            var e = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2,
              r =
                (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 -
                Rr / 2;
            return [Lr(r) * e, Dr(r) * e];
          }),
          (a.innerRadius = function (n) {
            return arguments.length
              ? ((t = "function" == typeof n ? n : zr(+n)), a)
              : t;
          }),
          (a.outerRadius = function (t) {
            return arguments.length
              ? ((n = "function" == typeof t ? t : zr(+t)), a)
              : n;
          }),
          (a.cornerRadius = function (t) {
            return arguments.length
              ? ((e = "function" == typeof t ? t : zr(+t)), a)
              : e;
          }),
          (a.padRadius = function (t) {
            return arguments.length
              ? ((r = null == t ? null : "function" == typeof t ? t : zr(+t)),
                a)
              : r;
          }),
          (a.startAngle = function (t) {
            return arguments.length
              ? ((i = "function" == typeof t ? t : zr(+t)), a)
              : i;
          }),
          (a.endAngle = function (t) {
            return arguments.length
              ? ((o = "function" == typeof t ? t : zr(+t)), a)
              : o;
          }),
          (a.padAngle = function (t) {
            return arguments.length
              ? ((s = "function" == typeof t ? t : zr(+t)), a)
              : s;
          }),
          (a.context = function (t) {
            return arguments.length ? ((u = null == t ? null : t), a) : u;
          }),
          a
        );
      };
      function Jr(t) {
        this._context = t;
      }
      Jr.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          this._point = 0;
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n);
              break;
            case 1:
              this._point = 2;
            default:
              this._context.lineTo(t, n);
          }
        },
      };
      var Zr = function (t) {
        return new Jr(t);
      };
      function ti(t) {
        return t[0];
      }
      function ni(t) {
        return t[1];
      }
      var ei = function () {
          var t = ti,
            n = ni,
            e = zr(!0),
            r = null,
            i = Zr,
            o = null;
          function s(s) {
            var u,
              a,
              c,
              h = s.length,
              l = !1;
            for (null == r && (o = i((c = Tr()))), u = 0; u <= h; ++u)
              !(u < h && e((a = s[u]), u, s)) === l &&
                ((l = !l) ? o.lineStart() : o.lineEnd()),
                l && o.point(+t(a, u, s), +n(a, u, s));
            if (c) return (o = null), c + "" || null;
          }
          return (
            (s.x = function (n) {
              return arguments.length
                ? ((t = "function" == typeof n ? n : zr(+n)), s)
                : t;
            }),
            (s.y = function (t) {
              return arguments.length
                ? ((n = "function" == typeof t ? t : zr(+t)), s)
                : n;
            }),
            (s.defined = function (t) {
              return arguments.length
                ? ((e = "function" == typeof t ? t : zr(!!t)), s)
                : e;
            }),
            (s.curve = function (t) {
              return arguments.length
                ? ((i = t), null != r && (o = i(r)), s)
                : i;
            }),
            (s.context = function (t) {
              return arguments.length
                ? (null == t ? (r = o = null) : (o = i((r = t))), s)
                : r;
            }),
            s
          );
        },
        ri = function () {
          var t = ti,
            n = null,
            e = zr(0),
            r = ni,
            i = zr(!0),
            o = null,
            s = Zr,
            u = null;
          function a(a) {
            var c,
              h,
              l,
              f,
              p,
              d = a.length,
              v = !1,
              y = new Array(d),
              g = new Array(d);
            for (null == o && (u = s((p = Tr()))), c = 0; c <= d; ++c) {
              if (!(c < d && i((f = a[c]), c, a)) === v)
                if ((v = !v)) (h = c), u.areaStart(), u.lineStart();
                else {
                  for (u.lineEnd(), u.lineStart(), l = c - 1; l >= h; --l)
                    u.point(y[l], g[l]);
                  u.lineEnd(), u.areaEnd();
                }
              v &&
                ((y[c] = +t(f, c, a)),
                (g[c] = +e(f, c, a)),
                u.point(n ? +n(f, c, a) : y[c], r ? +r(f, c, a) : g[c]));
            }
            if (p) return (u = null), p + "" || null;
          }
          function c() {
            return ei().defined(i).curve(s).context(o);
          }
          return (
            (a.x = function (e) {
              return arguments.length
                ? ((t = "function" == typeof e ? e : zr(+e)), (n = null), a)
                : t;
            }),
            (a.x0 = function (n) {
              return arguments.length
                ? ((t = "function" == typeof n ? n : zr(+n)), a)
                : t;
            }),
            (a.x1 = function (t) {
              return arguments.length
                ? ((n = null == t ? null : "function" == typeof t ? t : zr(+t)),
                  a)
                : n;
            }),
            (a.y = function (t) {
              return arguments.length
                ? ((e = "function" == typeof t ? t : zr(+t)), (r = null), a)
                : e;
            }),
            (a.y0 = function (t) {
              return arguments.length
                ? ((e = "function" == typeof t ? t : zr(+t)), a)
                : e;
            }),
            (a.y1 = function (t) {
              return arguments.length
                ? ((r = null == t ? null : "function" == typeof t ? t : zr(+t)),
                  a)
                : r;
            }),
            (a.lineX0 = a.lineY0 = function () {
              return c().x(t).y(e);
            }),
            (a.lineY1 = function () {
              return c().x(t).y(r);
            }),
            (a.lineX1 = function () {
              return c().x(n).y(e);
            }),
            (a.defined = function (t) {
              return arguments.length
                ? ((i = "function" == typeof t ? t : zr(!!t)), a)
                : i;
            }),
            (a.curve = function (t) {
              return arguments.length
                ? ((s = t), null != o && (u = s(o)), a)
                : s;
            }),
            (a.context = function (t) {
              return arguments.length
                ? (null == t ? (o = u = null) : (u = s((o = t))), a)
                : o;
            }),
            a
          );
        },
        ii = function (t, n) {
          return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
        },
        oi = function (t) {
          return t;
        },
        si = function () {
          var t = oi,
            n = ii,
            e = null,
            r = zr(0),
            i = zr(Xr),
            o = zr(0);
          function s(s) {
            var u,
              a,
              c,
              h,
              l,
              f = s.length,
              p = 0,
              d = new Array(f),
              v = new Array(f),
              y = +r.apply(this, arguments),
              g = Math.min(Xr, Math.max(-Xr, i.apply(this, arguments) - y)),
              _ = Math.min(Math.abs(g) / f, o.apply(this, arguments)),
              m = _ * (g < 0 ? -1 : 1);
            for (u = 0; u < f; ++u)
              (l = v[(d[u] = u)] = +t(s[u], u, s)) > 0 && (p += l);
            for (
              null != n
                ? d.sort(function (t, e) {
                    return n(v[t], v[e]);
                  })
                : null != e &&
                  d.sort(function (t, n) {
                    return e(s[t], s[n]);
                  }),
                u = 0,
                c = p ? (g - f * m) / p : 0;
              u < f;
              ++u, y = h
            )
              (a = d[u]),
                (h = y + ((l = v[a]) > 0 ? l * c : 0) + m),
                (v[a] = {
                  data: s[a],
                  index: u,
                  value: l,
                  startAngle: y,
                  endAngle: h,
                  padAngle: _,
                });
            return v;
          }
          return (
            (s.value = function (n) {
              return arguments.length
                ? ((t = "function" == typeof n ? n : zr(+n)), s)
                : t;
            }),
            (s.sortValues = function (t) {
              return arguments.length ? ((n = t), (e = null), s) : n;
            }),
            (s.sort = function (t) {
              return arguments.length ? ((e = t), (n = null), s) : e;
            }),
            (s.startAngle = function (t) {
              return arguments.length
                ? ((r = "function" == typeof t ? t : zr(+t)), s)
                : r;
            }),
            (s.endAngle = function (t) {
              return arguments.length
                ? ((i = "function" == typeof t ? t : zr(+t)), s)
                : i;
            }),
            (s.padAngle = function (t) {
              return arguments.length
                ? ((o = "function" == typeof t ? t : zr(+t)), s)
                : o;
            }),
            s
          );
        },
        ui = ci(Zr);
      function ai(t) {
        this._curve = t;
      }
      function ci(t) {
        function n(n) {
          return new ai(t(n));
        }
        return (n._curve = t), n;
      }
      function hi(t) {
        var n = t.curve;
        return (
          (t.angle = t.x),
          delete t.x,
          (t.radius = t.y),
          delete t.y,
          (t.curve = function (t) {
            return arguments.length ? n(ci(t)) : n()._curve;
          }),
          t
        );
      }
      ai.prototype = {
        areaStart: function () {
          this._curve.areaStart();
        },
        areaEnd: function () {
          this._curve.areaEnd();
        },
        lineStart: function () {
          this._curve.lineStart();
        },
        lineEnd: function () {
          this._curve.lineEnd();
        },
        point: function (t, n) {
          this._curve.point(n * Math.sin(t), n * -Math.cos(t));
        },
      };
      var li = function () {
          return hi(ei().curve(ui));
        },
        fi = function () {
          var t = ri().curve(ui),
            n = t.curve,
            e = t.lineX0,
            r = t.lineX1,
            i = t.lineY0,
            o = t.lineY1;
          return (
            (t.angle = t.x),
            delete t.x,
            (t.startAngle = t.x0),
            delete t.x0,
            (t.endAngle = t.x1),
            delete t.x1,
            (t.radius = t.y),
            delete t.y,
            (t.innerRadius = t.y0),
            delete t.y0,
            (t.outerRadius = t.y1),
            delete t.y1,
            (t.lineStartAngle = function () {
              return hi(e());
            }),
            delete t.lineX0,
            (t.lineEndAngle = function () {
              return hi(r());
            }),
            delete t.lineX1,
            (t.lineInnerRadius = function () {
              return hi(i());
            }),
            delete t.lineY0,
            (t.lineOuterRadius = function () {
              return hi(o());
            }),
            delete t.lineY1,
            (t.curve = function (t) {
              return arguments.length ? n(ci(t)) : n()._curve;
            }),
            t
          );
        },
        pi = function (t, n) {
          return [(n = +n) * Math.cos((t -= Math.PI / 2)), n * Math.sin(t)];
        },
        di = Array.prototype.slice;
      function vi(t) {
        return t.source;
      }
      function yi(t) {
        return t.target;
      }
      function gi(t) {
        var n = vi,
          e = yi,
          r = ti,
          i = ni,
          o = null;
        function s() {
          var s,
            u = di.call(arguments),
            a = n.apply(this, u),
            c = e.apply(this, u);
          if (
            (o || (o = s = Tr()),
            t(
              o,
              +r.apply(this, ((u[0] = a), u)),
              +i.apply(this, u),
              +r.apply(this, ((u[0] = c), u)),
              +i.apply(this, u)
            ),
            s)
          )
            return (o = null), s + "" || null;
        }
        return (
          (s.source = function (t) {
            return arguments.length ? ((n = t), s) : n;
          }),
          (s.target = function (t) {
            return arguments.length ? ((e = t), s) : e;
          }),
          (s.x = function (t) {
            return arguments.length
              ? ((r = "function" == typeof t ? t : zr(+t)), s)
              : r;
          }),
          (s.y = function (t) {
            return arguments.length
              ? ((i = "function" == typeof t ? t : zr(+t)), s)
              : i;
          }),
          (s.context = function (t) {
            return arguments.length ? ((o = null == t ? null : t), s) : o;
          }),
          s
        );
      }
      function _i(t, n, e, r, i) {
        t.moveTo(n, e), t.bezierCurveTo((n = (n + r) / 2), e, n, i, r, i);
      }
      function mi(t, n, e, r, i) {
        t.moveTo(n, e), t.bezierCurveTo(n, (e = (e + i) / 2), r, e, r, i);
      }
      function xi(t, n, e, r, i) {
        var o = pi(n, e),
          s = pi(n, (e = (e + i) / 2)),
          u = pi(r, e),
          a = pi(r, i);
        t.moveTo(o[0], o[1]),
          t.bezierCurveTo(s[0], s[1], u[0], u[1], a[0], a[1]);
      }
      function bi() {
        return gi(_i);
      }
      function wi() {
        return gi(mi);
      }
      function ki() {
        var t = gi(xi);
        return (t.angle = t.x), delete t.x, (t.radius = t.y), delete t.y, t;
      }
      var Mi = {
          draw: function (t, n) {
            var e = Math.sqrt(n / Rr);
            t.moveTo(e, 0), t.arc(0, 0, e, 0, Xr);
          },
        },
        Ei = {
          draw: function (t, n) {
            var e = Math.sqrt(n / 5) / 2;
            t.moveTo(-3 * e, -e),
              t.lineTo(-e, -e),
              t.lineTo(-e, -3 * e),
              t.lineTo(e, -3 * e),
              t.lineTo(e, -e),
              t.lineTo(3 * e, -e),
              t.lineTo(3 * e, e),
              t.lineTo(e, e),
              t.lineTo(e, 3 * e),
              t.lineTo(-e, 3 * e),
              t.lineTo(-e, e),
              t.lineTo(-3 * e, e),
              t.closePath();
          },
        },
        Si = Math.sqrt(1 / 3),
        Ai = 2 * Si,
        Oi = {
          draw: function (t, n) {
            var e = Math.sqrt(n / Ai),
              r = e * Si;
            t.moveTo(0, -e),
              t.lineTo(r, 0),
              t.lineTo(0, e),
              t.lineTo(-r, 0),
              t.closePath();
          },
        },
        Ni = Math.sin(Rr / 10) / Math.sin((7 * Rr) / 10),
        Pi = Math.sin(Xr / 10) * Ni,
        Ti = -Math.cos(Xr / 10) * Ni,
        zi = {
          draw: function (t, n) {
            var e = Math.sqrt(0.8908130915292852 * n),
              r = Pi * e,
              i = Ti * e;
            t.moveTo(0, -e), t.lineTo(r, i);
            for (var o = 1; o < 5; ++o) {
              var s = (Xr * o) / 5,
                u = Math.cos(s),
                a = Math.sin(s);
              t.lineTo(a * e, -u * e), t.lineTo(u * r - a * i, a * r + u * i);
            }
            t.closePath();
          },
        },
        Ii = {
          draw: function (t, n) {
            var e = Math.sqrt(n),
              r = -e / 2;
            t.rect(r, r, e, e);
          },
        },
        Ci = Math.sqrt(3),
        Li = {
          draw: function (t, n) {
            var e = -Math.sqrt(n / (3 * Ci));
            t.moveTo(0, 2 * e),
              t.lineTo(-Ci * e, -e),
              t.lineTo(Ci * e, -e),
              t.closePath();
          },
        },
        ji = Math.sqrt(3) / 2,
        qi = 1 / Math.sqrt(12),
        Di = 3 * (qi / 2 + 1),
        Vi = {
          draw: function (t, n) {
            var e = Math.sqrt(n / Di),
              r = e / 2,
              i = e * qi,
              o = r,
              s = e * qi + e,
              u = -o,
              a = s;
            t.moveTo(r, i),
              t.lineTo(o, s),
              t.lineTo(u, a),
              t.lineTo(-0.5 * r - ji * i, ji * r + -0.5 * i),
              t.lineTo(-0.5 * o - ji * s, ji * o + -0.5 * s),
              t.lineTo(-0.5 * u - ji * a, ji * u + -0.5 * a),
              t.lineTo(-0.5 * r + ji * i, -0.5 * i - ji * r),
              t.lineTo(-0.5 * o + ji * s, -0.5 * s - ji * o),
              t.lineTo(-0.5 * u + ji * a, -0.5 * a - ji * u),
              t.closePath();
          },
        },
        Bi = [Mi, Ei, Oi, Ii, zi, Li, Vi],
        Ri = function () {
          var t = zr(Mi),
            n = zr(64),
            e = null;
          function r() {
            var r;
            if (
              (e || (e = r = Tr()),
              t.apply(this, arguments).draw(e, +n.apply(this, arguments)),
              r)
            )
              return (e = null), r + "" || null;
          }
          return (
            (r.type = function (n) {
              return arguments.length
                ? ((t = "function" == typeof n ? n : zr(n)), r)
                : t;
            }),
            (r.size = function (t) {
              return arguments.length
                ? ((n = "function" == typeof t ? t : zr(+t)), r)
                : n;
            }),
            (r.context = function (t) {
              return arguments.length ? ((e = null == t ? null : t), r) : e;
            }),
            r
          );
        },
        Gi = function () {};
      function Xi(t, n, e) {
        t._context.bezierCurveTo(
          (2 * t._x0 + t._x1) / 3,
          (2 * t._y0 + t._y1) / 3,
          (t._x0 + 2 * t._x1) / 3,
          (t._y0 + 2 * t._y1) / 3,
          (t._x0 + 4 * t._x1 + n) / 6,
          (t._y0 + 4 * t._y1 + e) / 6
        );
      }
      function Yi(t) {
        this._context = t;
      }
      Yi.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 3:
              Xi(this, this._x1, this._y1);
            case 2:
              this._context.lineTo(this._x1, this._y1);
          }
          (this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              (this._point = 3),
                this._context.lineTo(
                  (5 * this._x0 + this._x1) / 6,
                  (5 * this._y0 + this._y1) / 6
                );
            default:
              Xi(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = t),
            (this._y0 = this._y1),
            (this._y1 = n);
        },
      };
      var Hi = function (t) {
        return new Yi(t);
      };
      function Fi(t) {
        this._context = t;
      }
      Fi.prototype = {
        areaStart: Gi,
        areaEnd: Gi,
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN),
            (this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x2, this._y2),
                this._context.closePath();
              break;
            case 2:
              this._context.moveTo(
                (this._x2 + 2 * this._x3) / 3,
                (this._y2 + 2 * this._y3) / 3
              ),
                this._context.lineTo(
                  (this._x3 + 2 * this._x2) / 3,
                  (this._y3 + 2 * this._y2) / 3
                ),
                this._context.closePath();
              break;
            case 3:
              this.point(this._x2, this._y2),
                this.point(this._x3, this._y3),
                this.point(this._x4, this._y4);
          }
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1), (this._x2 = t), (this._y2 = n);
              break;
            case 1:
              (this._point = 2), (this._x3 = t), (this._y3 = n);
              break;
            case 2:
              (this._point = 3),
                (this._x4 = t),
                (this._y4 = n),
                this._context.moveTo(
                  (this._x0 + 4 * this._x1 + t) / 6,
                  (this._y0 + 4 * this._y1 + n) / 6
                );
              break;
            default:
              Xi(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = t),
            (this._y0 = this._y1),
            (this._y1 = n);
        },
      };
      var Ui = function (t) {
        return new Fi(t);
      };
      function Wi(t) {
        this._context = t;
      }
      Wi.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._y0 = this._y1 = NaN), (this._point = 0);
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 3 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
              var e = (this._x0 + 4 * this._x1 + t) / 6,
                r = (this._y0 + 4 * this._y1 + n) / 6;
              this._line
                ? this._context.lineTo(e, r)
                : this._context.moveTo(e, r);
              break;
            case 3:
              this._point = 4;
            default:
              Xi(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = t),
            (this._y0 = this._y1),
            (this._y1 = n);
        },
      };
      var Qi = function (t) {
        return new Wi(t);
      };
      function Ki(t, n) {
        (this._basis = new Yi(t)), (this._beta = n);
      }
      Ki.prototype = {
        lineStart: function () {
          (this._x = []), (this._y = []), this._basis.lineStart();
        },
        lineEnd: function () {
          var t = this._x,
            n = this._y,
            e = t.length - 1;
          if (e > 0)
            for (
              var r, i = t[0], o = n[0], s = t[e] - i, u = n[e] - o, a = -1;
              ++a <= e;

            )
              (r = a / e),
                this._basis.point(
                  this._beta * t[a] + (1 - this._beta) * (i + r * s),
                  this._beta * n[a] + (1 - this._beta) * (o + r * u)
                );
          (this._x = this._y = null), this._basis.lineEnd();
        },
        point: function (t, n) {
          this._x.push(+t), this._y.push(+n);
        },
      };
      var $i = (function t(n) {
        function e(t) {
          return 1 === n ? new Yi(t) : new Ki(t, n);
        }
        return (
          (e.beta = function (n) {
            return t(+n);
          }),
          e
        );
      })(0.85);
      function Ji(t, n, e) {
        t._context.bezierCurveTo(
          t._x1 + t._k * (t._x2 - t._x0),
          t._y1 + t._k * (t._y2 - t._y0),
          t._x2 + t._k * (t._x1 - n),
          t._y2 + t._k * (t._y1 - e),
          t._x2,
          t._y2
        );
      }
      function Zi(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      Zi.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2);
              break;
            case 3:
              Ji(this, this._x1, this._y1);
          }
          (this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n);
              break;
            case 1:
              (this._point = 2), (this._x1 = t), (this._y1 = n);
              break;
            case 2:
              this._point = 3;
            default:
              Ji(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      };
      var to = (function t(n) {
        function e(t) {
          return new Zi(t, n);
        }
        return (
          (e.tension = function (n) {
            return t(+n);
          }),
          e
        );
      })(0);
      function no(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      no.prototype = {
        areaStart: Gi,
        areaEnd: Gi,
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN),
            (this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x3, this._y3),
                this._context.closePath();
              break;
            case 2:
              this._context.lineTo(this._x3, this._y3),
                this._context.closePath();
              break;
            case 3:
              this.point(this._x3, this._y3),
                this.point(this._x4, this._y4),
                this.point(this._x5, this._y5);
          }
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1), (this._x3 = t), (this._y3 = n);
              break;
            case 1:
              (this._point = 2),
                this._context.moveTo((this._x4 = t), (this._y4 = n));
              break;
            case 2:
              (this._point = 3), (this._x5 = t), (this._y5 = n);
              break;
            default:
              Ji(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      };
      var eo = (function t(n) {
        function e(t) {
          return new no(t, n);
        }
        return (
          (e.tension = function (n) {
            return t(+n);
          }),
          e
        );
      })(0);
      function ro(t, n) {
        (this._context = t), (this._k = (1 - n) / 6);
      }
      ro.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._point = 0);
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 3 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              (this._point = 3),
                this._line
                  ? this._context.lineTo(this._x2, this._y2)
                  : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              Ji(this, t, n);
          }
          (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      };
      var io = (function t(n) {
        function e(t) {
          return new ro(t, n);
        }
        return (
          (e.tension = function (n) {
            return t(+n);
          }),
          e
        );
      })(0);
      function oo(t, n, e) {
        var r = t._x1,
          i = t._y1,
          o = t._x2,
          s = t._y2;
        if (t._l01_a > Br) {
          var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
            a = 3 * t._l01_a * (t._l01_a + t._l12_a);
          (r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / a),
            (i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / a);
        }
        if (t._l23_a > Br) {
          var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
            h = 3 * t._l23_a * (t._l23_a + t._l12_a);
          (o = (o * c + t._x1 * t._l23_2a - n * t._l12_2a) / h),
            (s = (s * c + t._y1 * t._l23_2a - e * t._l12_2a) / h);
        }
        t._context.bezierCurveTo(r, i, o, s, t._x2, t._y2);
      }
      function so(t, n) {
        (this._context = t), (this._alpha = n);
      }
      so.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x2, this._y2);
              break;
            case 3:
              this.point(this._x2, this._y2);
          }
          (this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var e = this._x2 - t,
              r = this._y2 - n;
            this._l23_a = Math.sqrt(
              (this._l23_2a = Math.pow(e * e + r * r, this._alpha))
            );
          }
          switch (this._point) {
            case 0:
              (this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n);
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              this._point = 3;
            default:
              oo(this, t, n);
          }
          (this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      };
      var uo = (function t(n) {
        function e(t) {
          return n ? new so(t, n) : new Zi(t, 0);
        }
        return (
          (e.alpha = function (n) {
            return t(+n);
          }),
          e
        );
      })(0.5);
      function ao(t, n) {
        (this._context = t), (this._alpha = n);
      }
      ao.prototype = {
        areaStart: Gi,
        areaEnd: Gi,
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 1:
              this._context.moveTo(this._x3, this._y3),
                this._context.closePath();
              break;
            case 2:
              this._context.lineTo(this._x3, this._y3),
                this._context.closePath();
              break;
            case 3:
              this.point(this._x3, this._y3),
                this.point(this._x4, this._y4),
                this.point(this._x5, this._y5);
          }
        },
        point: function (t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var e = this._x2 - t,
              r = this._y2 - n;
            this._l23_a = Math.sqrt(
              (this._l23_2a = Math.pow(e * e + r * r, this._alpha))
            );
          }
          switch (this._point) {
            case 0:
              (this._point = 1), (this._x3 = t), (this._y3 = n);
              break;
            case 1:
              (this._point = 2),
                this._context.moveTo((this._x4 = t), (this._y4 = n));
              break;
            case 2:
              (this._point = 3), (this._x5 = t), (this._y5 = n);
              break;
            default:
              oo(this, t, n);
          }
          (this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      };
      var co = (function t(n) {
        function e(t) {
          return n ? new ao(t, n) : new no(t, 0);
        }
        return (
          (e.alpha = function (n) {
            return t(+n);
          }),
          e
        );
      })(0.5);
      function ho(t, n) {
        (this._context = t), (this._alpha = n);
      }
      ho.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN),
            (this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0);
        },
        lineEnd: function () {
          (this._line || (0 !== this._line && 3 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          if (((t = +t), (n = +n), this._point)) {
            var e = this._x2 - t,
              r = this._y2 - n;
            this._l23_a = Math.sqrt(
              (this._l23_2a = Math.pow(e * e + r * r, this._alpha))
            );
          }
          switch (this._point) {
            case 0:
              this._point = 1;
              break;
            case 1:
              this._point = 2;
              break;
            case 2:
              (this._point = 3),
                this._line
                  ? this._context.lineTo(this._x2, this._y2)
                  : this._context.moveTo(this._x2, this._y2);
              break;
            case 3:
              this._point = 4;
            default:
              oo(this, t, n);
          }
          (this._l01_a = this._l12_a),
            (this._l12_a = this._l23_a),
            (this._l01_2a = this._l12_2a),
            (this._l12_2a = this._l23_2a),
            (this._x0 = this._x1),
            (this._x1 = this._x2),
            (this._x2 = t),
            (this._y0 = this._y1),
            (this._y1 = this._y2),
            (this._y2 = n);
        },
      };
      var lo = (function t(n) {
        function e(t) {
          return n ? new ho(t, n) : new ro(t, 0);
        }
        return (
          (e.alpha = function (n) {
            return t(+n);
          }),
          e
        );
      })(0.5);
      function fo(t) {
        this._context = t;
      }
      fo.prototype = {
        areaStart: Gi,
        areaEnd: Gi,
        lineStart: function () {
          this._point = 0;
        },
        lineEnd: function () {
          this._point && this._context.closePath();
        },
        point: function (t, n) {
          (t = +t),
            (n = +n),
            this._point
              ? this._context.lineTo(t, n)
              : ((this._point = 1), this._context.moveTo(t, n));
        },
      };
      var po = function (t) {
        return new fo(t);
      };
      function vo(t) {
        return t < 0 ? -1 : 1;
      }
      function yo(t, n, e) {
        var r = t._x1 - t._x0,
          i = n - t._x1,
          o = (t._y1 - t._y0) / (r || (i < 0 && -0)),
          s = (e - t._y1) / (i || (r < 0 && -0)),
          u = (o * i + s * r) / (r + i);
        return (
          (vo(o) + vo(s)) *
            Math.min(Math.abs(o), Math.abs(s), 0.5 * Math.abs(u)) || 0
        );
      }
      function go(t, n) {
        var e = t._x1 - t._x0;
        return e ? ((3 * (t._y1 - t._y0)) / e - n) / 2 : n;
      }
      function _o(t, n, e) {
        var r = t._x0,
          i = t._y0,
          o = t._x1,
          s = t._y1,
          u = (o - r) / 3;
        t._context.bezierCurveTo(r + u, i + u * n, o - u, s - u * e, o, s);
      }
      function mo(t) {
        this._context = t;
      }
      function xo(t) {
        this._context = new bo(t);
      }
      function bo(t) {
        this._context = t;
      }
      function wo(t) {
        return new mo(t);
      }
      function ko(t) {
        return new xo(t);
      }
      function Mo(t) {
        this._context = t;
      }
      function Eo(t) {
        var n,
          e,
          r = t.length - 1,
          i = new Array(r),
          o = new Array(r),
          s = new Array(r);
        for (i[0] = 0, o[0] = 2, s[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n)
          (i[n] = 1), (o[n] = 4), (s[n] = 4 * t[n] + 2 * t[n + 1]);
        for (
          i[r - 1] = 2, o[r - 1] = 7, s[r - 1] = 8 * t[r - 1] + t[r], n = 1;
          n < r;
          ++n
        )
          (e = i[n] / o[n - 1]), (o[n] -= e), (s[n] -= e * s[n - 1]);
        for (i[r - 1] = s[r - 1] / o[r - 1], n = r - 2; n >= 0; --n)
          i[n] = (s[n] - i[n + 1]) / o[n];
        for (o[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n)
          o[n] = 2 * t[n + 1] - i[n + 1];
        return [i, o];
      }
      (mo.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN),
            (this._point = 0);
        },
        lineEnd: function () {
          switch (this._point) {
            case 2:
              this._context.lineTo(this._x1, this._y1);
              break;
            case 3:
              _o(this, this._t0, go(this, this._t0));
          }
          (this._line || (0 !== this._line && 1 === this._point)) &&
            this._context.closePath(),
            (this._line = 1 - this._line);
        },
        point: function (t, n) {
          var e = NaN;
          if (((n = +n), (t = +t) !== this._x1 || n !== this._y1)) {
            switch (this._point) {
              case 0:
                (this._point = 1),
                  this._line
                    ? this._context.lineTo(t, n)
                    : this._context.moveTo(t, n);
                break;
              case 1:
                this._point = 2;
                break;
              case 2:
                (this._point = 3), _o(this, go(this, (e = yo(this, t, n))), e);
                break;
              default:
                _o(this, this._t0, (e = yo(this, t, n)));
            }
            (this._x0 = this._x1),
              (this._x1 = t),
              (this._y0 = this._y1),
              (this._y1 = n),
              (this._t0 = e);
          }
        },
      }),
        ((xo.prototype = Object.create(mo.prototype)).point = function (t, n) {
          mo.prototype.point.call(this, n, t);
        }),
        (bo.prototype = {
          moveTo: function (t, n) {
            this._context.moveTo(n, t);
          },
          closePath: function () {
            this._context.closePath();
          },
          lineTo: function (t, n) {
            this._context.lineTo(n, t);
          },
          bezierCurveTo: function (t, n, e, r, i, o) {
            this._context.bezierCurveTo(n, t, r, e, o, i);
          },
        }),
        (Mo.prototype = {
          areaStart: function () {
            this._line = 0;
          },
          areaEnd: function () {
            this._line = NaN;
          },
          lineStart: function () {
            (this._x = []), (this._y = []);
          },
          lineEnd: function () {
            var t = this._x,
              n = this._y,
              e = t.length;
            if (e)
              if (
                (this._line
                  ? this._context.lineTo(t[0], n[0])
                  : this._context.moveTo(t[0], n[0]),
                2 === e)
              )
                this._context.lineTo(t[1], n[1]);
              else
                for (var r = Eo(t), i = Eo(n), o = 0, s = 1; s < e; ++o, ++s)
                  this._context.bezierCurveTo(
                    r[0][o],
                    i[0][o],
                    r[1][o],
                    i[1][o],
                    t[s],
                    n[s]
                  );
            (this._line || (0 !== this._line && 1 === e)) &&
              this._context.closePath(),
              (this._line = 1 - this._line),
              (this._x = this._y = null);
          },
          point: function (t, n) {
            this._x.push(+t), this._y.push(+n);
          },
        });
      var So = function (t) {
        return new Mo(t);
      };
      function Ao(t, n) {
        (this._context = t), (this._t = n);
      }
      Ao.prototype = {
        areaStart: function () {
          this._line = 0;
        },
        areaEnd: function () {
          this._line = NaN;
        },
        lineStart: function () {
          (this._x = this._y = NaN), (this._point = 0);
        },
        lineEnd: function () {
          0 < this._t &&
            this._t < 1 &&
            2 === this._point &&
            this._context.lineTo(this._x, this._y),
            (this._line || (0 !== this._line && 1 === this._point)) &&
              this._context.closePath(),
            this._line >= 0 &&
              ((this._t = 1 - this._t), (this._line = 1 - this._line));
        },
        point: function (t, n) {
          switch (((t = +t), (n = +n), this._point)) {
            case 0:
              (this._point = 1),
                this._line
                  ? this._context.lineTo(t, n)
                  : this._context.moveTo(t, n);
              break;
            case 1:
              this._point = 2;
            default:
              if (this._t <= 0)
                this._context.lineTo(this._x, n), this._context.lineTo(t, n);
              else {
                var e = this._x * (1 - this._t) + t * this._t;
                this._context.lineTo(e, this._y), this._context.lineTo(e, n);
              }
          }
          (this._x = t), (this._y = n);
        },
      };
      var Oo = function (t) {
        return new Ao(t, 0.5);
      };
      function No(t) {
        return new Ao(t, 0);
      }
      function Po(t) {
        return new Ao(t, 1);
      }
      var To = function (t, n) {
          if ((i = t.length) > 1)
            for (var e, r, i, o = 1, s = t[n[0]], u = s.length; o < i; ++o)
              for (r = s, s = t[n[o]], e = 0; e < u; ++e)
                s[e][1] += s[e][0] = isNaN(r[e][1]) ? r[e][0] : r[e][1];
        },
        zo = function (t) {
          for (var n = t.length, e = new Array(n); --n >= 0; ) e[n] = n;
          return e;
        };
      function Io(t, n) {
        return t[n];
      }
      var Co = function () {
          var t = zr([]),
            n = zo,
            e = To,
            r = Io;
          function i(i) {
            var o,
              s,
              u = t.apply(this, arguments),
              a = i.length,
              c = u.length,
              h = new Array(c);
            for (o = 0; o < c; ++o) {
              for (
                var l, f = u[o], p = (h[o] = new Array(a)), d = 0;
                d < a;
                ++d
              )
                (p[d] = l = [0, +r(i[d], f, d, i)]), (l.data = i[d]);
              p.key = f;
            }
            for (o = 0, s = n(h); o < c; ++o) h[s[o]].index = o;
            return e(h, s), h;
          }
          return (
            (i.keys = function (n) {
              return arguments.length
                ? ((t = "function" == typeof n ? n : zr(di.call(n))), i)
                : t;
            }),
            (i.value = function (t) {
              return arguments.length
                ? ((r = "function" == typeof t ? t : zr(+t)), i)
                : r;
            }),
            (i.order = function (t) {
              return arguments.length
                ? ((n =
                    null == t
                      ? zo
                      : "function" == typeof t
                      ? t
                      : zr(di.call(t))),
                  i)
                : n;
            }),
            (i.offset = function (t) {
              return arguments.length ? ((e = null == t ? To : t), i) : e;
            }),
            i
          );
        },
        Lo = function (t, n) {
          if ((r = t.length) > 0) {
            for (var e, r, i, o = 0, s = t[0].length; o < s; ++o) {
              for (i = e = 0; e < r; ++e) i += t[e][o][1] || 0;
              if (i) for (e = 0; e < r; ++e) t[e][o][1] /= i;
            }
            To(t, n);
          }
        },
        jo = function (t, n) {
          if ((u = t.length) > 1)
            for (var e, r, i, o, s, u, a = 0, c = t[n[0]].length; a < c; ++a)
              for (o = s = 0, e = 0; e < u; ++e)
                (i = (r = t[n[e]][a])[1] - r[0]) >= 0
                  ? ((r[0] = o), (r[1] = o += i))
                  : i < 0
                  ? ((r[1] = s), (r[0] = s += i))
                  : (r[0] = o);
        },
        qo = function (t, n) {
          if ((e = t.length) > 0) {
            for (var e, r = 0, i = t[n[0]], o = i.length; r < o; ++r) {
              for (var s = 0, u = 0; s < e; ++s) u += t[s][r][1] || 0;
              i[r][1] += i[r][0] = -u / 2;
            }
            To(t, n);
          }
        },
        Do = function (t, n) {
          if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
            for (var e, r, i, o = 0, s = 1; s < r; ++s) {
              for (var u = 0, a = 0, c = 0; u < i; ++u) {
                for (
                  var h = t[n[u]],
                    l = h[s][1] || 0,
                    f = (l - (h[s - 1][1] || 0)) / 2,
                    p = 0;
                  p < u;
                  ++p
                ) {
                  var d = t[n[p]];
                  f += (d[s][1] || 0) - (d[s - 1][1] || 0);
                }
                (a += l), (c += f * l);
              }
              (e[s - 1][1] += e[s - 1][0] = o), a && (o -= c / a);
            }
            (e[s - 1][1] += e[s - 1][0] = o), To(t, n);
          }
        },
        Vo = function (t) {
          var n = t.map(Bo);
          return zo(t).sort(function (t, e) {
            return n[t] - n[e];
          });
        };
      function Bo(t) {
        for (var n, e = 0, r = -1, i = t.length; ++r < i; )
          (n = +t[r][1]) && (e += n);
        return e;
      }
      var Ro = function (t) {
          return Vo(t).reverse();
        },
        Go = function (t) {
          var n,
            e,
            r = t.length,
            i = t.map(Bo),
            o = zo(t).sort(function (t, n) {
              return i[n] - i[t];
            }),
            s = 0,
            u = 0,
            a = [],
            c = [];
          for (n = 0; n < r; ++n)
            (e = o[n]),
              s < u ? ((s += i[e]), a.push(e)) : ((u += i[e]), c.push(e));
          return c.reverse().concat(a);
        },
        Xo = function (t) {
          return zo(t).reverse();
        },
        Yo = function (t) {
          return function () {
            return t;
          };
        };
      function Ho(t, n, e) {
        (this.target = t), (this.type = n), (this.transform = e);
      }
      function Fo(t, n, e) {
        (this.k = t), (this.x = n), (this.y = e);
      }
      Fo.prototype = {
        constructor: Fo,
        scale: function (t) {
          return 1 === t ? this : new Fo(this.k * t, this.x, this.y);
        },
        translate: function (t, n) {
          return (0 === t) & (0 === n)
            ? this
            : new Fo(this.k, this.x + this.k * t, this.y + this.k * n);
        },
        apply: function (t) {
          return [t[0] * this.k + this.x, t[1] * this.k + this.y];
        },
        applyX: function (t) {
          return t * this.k + this.x;
        },
        applyY: function (t) {
          return t * this.k + this.y;
        },
        invert: function (t) {
          return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
        },
        invertX: function (t) {
          return (t - this.x) / this.k;
        },
        invertY: function (t) {
          return (t - this.y) / this.k;
        },
        rescaleX: function (t) {
          return t
            .copy()
            .domain(t.range().map(this.invertX, this).map(t.invert, t));
        },
        rescaleY: function (t) {
          return t
            .copy()
            .domain(t.range().map(this.invertY, this).map(t.invert, t));
        },
        toString: function () {
          return (
            "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
          );
        },
      };
      var Uo = new Fo(1, 0, 0);
      function Wo() {
        V.stopImmediatePropagation();
      }
      Fo.prototype;
      var Qo = function () {
        V.preventDefault(), V.stopImmediatePropagation();
      };
      function Ko() {
        return !V.button;
      }
      function $o() {
        var t,
          n,
          e = this;
        return (
          e instanceof SVGElement
            ? ((t = (e = e.ownerSVGElement || e).width.baseVal.value),
              (n = e.height.baseVal.value))
            : ((t = e.clientWidth), (n = e.clientHeight)),
          [
            [0, 0],
            [t, n],
          ]
        );
      }
      function Jo() {
        return this.__zoom || Uo;
      }
      function Zo() {
        return (-V.deltaY * (V.deltaMode ? 120 : 1)) / 500;
      }
      function ts() {
        return "ontouchstart" in this;
      }
      function ns(t, n, e) {
        var r = t.invertX(n[0][0]) - e[0][0],
          i = t.invertX(n[1][0]) - e[1][0],
          o = t.invertY(n[0][1]) - e[0][1],
          s = t.invertY(n[1][1]) - e[1][1];
        return t.translate(
          i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
          s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
        );
      }
      var es = function () {
          var t,
            n,
            e = Ko,
            r = $o,
            i = ns,
            o = Zo,
            s = ts,
            u = [0, 1 / 0],
            a = [
              [-1 / 0, -1 / 0],
              [1 / 0, 1 / 0],
            ],
            c = 250,
            h = de,
            l = [],
            f = ht("start", "zoom", "end"),
            p = 500,
            d = 150,
            v = 0;
          function y(t) {
            t.property("__zoom", Jo)
              .on("wheel.zoom", k)
              .on("mousedown.zoom", M)
              .on("dblclick.zoom", E)
              .filter(s)
              .on("touchstart.zoom", S)
              .on("touchmove.zoom", A)
              .on("touchend.zoom touchcancel.zoom", O)
              .style("touch-action", "none")
              .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
          }
          function g(t, n) {
            return (n = Math.max(u[0], Math.min(u[1], n))) === t.k
              ? t
              : new Fo(n, t.x, t.y);
          }
          function _(t, n, e) {
            var r = n[0] - e[0] * t.k,
              i = n[1] - e[1] * t.k;
            return r === t.x && i === t.y ? t : new Fo(t.k, r, i);
          }
          function m(t) {
            return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2];
          }
          function x(t, n, e) {
            t.on("start.zoom", function () {
              b(this, arguments).start();
            })
              .on("interrupt.zoom end.zoom", function () {
                b(this, arguments).end();
              })
              .tween("zoom", function () {
                var t = arguments,
                  i = b(this, t),
                  o = r.apply(this, t),
                  s = e || m(o),
                  u = Math.max(o[1][0] - o[0][0], o[1][1] - o[0][1]),
                  a = this.__zoom,
                  c = "function" == typeof n ? n.apply(this, t) : n,
                  l = h(
                    a.invert(s).concat(u / a.k),
                    c.invert(s).concat(u / c.k)
                  );
                return function (t) {
                  if (1 === t) t = c;
                  else {
                    var n = l(t),
                      e = u / n[2];
                    t = new Fo(e, s[0] - n[0] * e, s[1] - n[1] * e);
                  }
                  i.zoom(null, t);
                };
              });
          }
          function b(t, n) {
            for (var e, r = 0, i = l.length; r < i; ++r)
              if ((e = l[r]).that === t) return e;
            return new w(t, n);
          }
          function w(t, n) {
            (this.that = t),
              (this.args = n),
              (this.index = -1),
              (this.active = 0),
              (this.extent = r.apply(t, n));
          }
          function k() {
            if (e.apply(this, arguments)) {
              var t = b(this, arguments),
                n = this.__zoom,
                r = Math.max(
                  u[0],
                  Math.min(u[1], n.k * Math.pow(2, o.apply(this, arguments)))
                ),
                s = nt(this);
              if (t.wheel)
                (t.mouse[0][0] === s[0] && t.mouse[0][1] === s[1]) ||
                  (t.mouse[1] = n.invert((t.mouse[0] = s))),
                  clearTimeout(t.wheel);
              else {
                if (n.k === r) return;
                (t.mouse = [s, n.invert(s)]), Rt(this), t.start();
              }
              Qo(),
                (t.wheel = setTimeout(function () {
                  (t.wheel = null), t.end();
                }, d)),
                t.zoom(
                  "mouse",
                  i(_(g(n, r), t.mouse[0], t.mouse[1]), t.extent, a)
                );
            }
          }
          function M() {
            if (!n && e.apply(this, arguments)) {
              var t = b(this, arguments),
                r = K(V.view)
                  .on(
                    "mousemove.zoom",
                    function () {
                      if ((Qo(), !t.moved)) {
                        var n = V.clientX - s,
                          e = V.clientY - u;
                        t.moved = n * n + e * e > v;
                      }
                      t.zoom(
                        "mouse",
                        i(
                          _(
                            t.that.__zoom,
                            (t.mouse[0] = nt(t.that)),
                            t.mouse[1]
                          ),
                          t.extent,
                          a
                        )
                      );
                    },
                    !0
                  )
                  .on(
                    "mouseup.zoom",
                    function () {
                      r.on("mousemove.zoom mouseup.zoom", null),
                        _r(V.view, t.moved),
                        Qo(),
                        t.end();
                    },
                    !0
                  ),
                o = nt(this),
                s = V.clientX,
                u = V.clientY;
              gr(V.view),
                Wo(),
                (t.mouse = [o, this.__zoom.invert(o)]),
                Rt(this),
                t.start();
            }
          }
          function E() {
            if (e.apply(this, arguments)) {
              var t = this.__zoom,
                n = nt(this),
                o = t.invert(n),
                s = t.k * (V.shiftKey ? 0.5 : 2),
                u = i(_(g(t, s), n, o), r.apply(this, arguments), a);
              Qo(),
                c > 0
                  ? K(this).transition().duration(c).call(x, u, n)
                  : K(this).call(y.transform, u);
            }
          }
          function S() {
            if (e.apply(this, arguments)) {
              var n,
                r,
                i,
                o,
                s = b(this, arguments),
                u = V.changedTouches,
                a = u.length;
              for (Wo(), r = 0; r < a; ++r)
                (i = u[r]),
                  (o = [
                    (o = et(this, u, i.identifier)),
                    this.__zoom.invert(o),
                    i.identifier,
                  ]),
                  s.touch0
                    ? s.touch1 || (s.touch1 = o)
                    : ((s.touch0 = o), (n = !0));
              if (t && ((t = clearTimeout(t)), !s.touch1))
                return (
                  s.end(),
                  void (
                    (o = K(this).on("dblclick.zoom")) &&
                    o.apply(this, arguments)
                  )
                );
              n &&
                ((t = setTimeout(function () {
                  t = null;
                }, p)),
                Rt(this),
                s.start());
            }
          }
          function A() {
            var n,
              e,
              r,
              o,
              s = b(this, arguments),
              u = V.changedTouches,
              c = u.length;
            for (Qo(), t && (t = clearTimeout(t)), n = 0; n < c; ++n)
              (e = u[n]),
                (r = et(this, u, e.identifier)),
                s.touch0 && s.touch0[2] === e.identifier
                  ? (s.touch0[0] = r)
                  : s.touch1 &&
                    s.touch1[2] === e.identifier &&
                    (s.touch1[0] = r);
            if (((e = s.that.__zoom), s.touch1)) {
              var h = s.touch0[0],
                l = s.touch0[1],
                f = s.touch1[0],
                p = s.touch1[1],
                d = (d = f[0] - h[0]) * d + (d = f[1] - h[1]) * d,
                v = (v = p[0] - l[0]) * v + (v = p[1] - l[1]) * v;
              (e = g(e, Math.sqrt(d / v))),
                (r = [(h[0] + f[0]) / 2, (h[1] + f[1]) / 2]),
                (o = [(l[0] + p[0]) / 2, (l[1] + p[1]) / 2]);
            } else {
              if (!s.touch0) return;
              (r = s.touch0[0]), (o = s.touch0[1]);
            }
            s.zoom("touch", i(_(e, r, o), s.extent, a));
          }
          function O() {
            var t,
              e,
              r = b(this, arguments),
              i = V.changedTouches,
              o = i.length;
            for (
              Wo(),
                n && clearTimeout(n),
                n = setTimeout(function () {
                  n = null;
                }, p),
                t = 0;
              t < o;
              ++t
            )
              (e = i[t]),
                r.touch0 && r.touch0[2] === e.identifier
                  ? delete r.touch0
                  : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
            r.touch1 && !r.touch0 && ((r.touch0 = r.touch1), delete r.touch1),
              r.touch0
                ? (r.touch0[1] = this.__zoom.invert(r.touch0[0]))
                : r.end();
          }
          return (
            (y.transform = function (t, n) {
              var e = t.selection ? t.selection() : t;
              e.property("__zoom", Jo),
                t !== e
                  ? x(t, n)
                  : e.interrupt().each(function () {
                      b(this, arguments)
                        .start()
                        .zoom(
                          null,
                          "function" == typeof n ? n.apply(this, arguments) : n
                        )
                        .end();
                    });
            }),
            (y.scaleBy = function (t, n) {
              y.scaleTo(t, function () {
                return (
                  this.__zoom.k *
                  ("function" == typeof n ? n.apply(this, arguments) : n)
                );
              });
            }),
            (y.scaleTo = function (t, n) {
              y.transform(t, function () {
                var t = r.apply(this, arguments),
                  e = this.__zoom,
                  o = m(t),
                  s = e.invert(o),
                  u = "function" == typeof n ? n.apply(this, arguments) : n;
                return i(_(g(e, u), o, s), t, a);
              });
            }),
            (y.translateBy = function (t, n, e) {
              y.transform(t, function () {
                return i(
                  this.__zoom.translate(
                    "function" == typeof n ? n.apply(this, arguments) : n,
                    "function" == typeof e ? e.apply(this, arguments) : e
                  ),
                  r.apply(this, arguments),
                  a
                );
              });
            }),
            (y.translateTo = function (t, n, e) {
              y.transform(t, function () {
                var t = r.apply(this, arguments),
                  o = this.__zoom,
                  s = m(t);
                return i(
                  Uo.translate(s[0], s[1])
                    .scale(o.k)
                    .translate(
                      "function" == typeof n ? -n.apply(this, arguments) : -n,
                      "function" == typeof e ? -e.apply(this, arguments) : -e
                    ),
                  t,
                  a
                );
              });
            }),
            (w.prototype = {
              start: function () {
                return (
                  1 == ++this.active &&
                    ((this.index = l.push(this) - 1), this.emit("start")),
                  this
                );
              },
              zoom: function (t, n) {
                return (
                  this.mouse &&
                    "mouse" !== t &&
                    (this.mouse[1] = n.invert(this.mouse[0])),
                  this.touch0 &&
                    "touch" !== t &&
                    (this.touch0[1] = n.invert(this.touch0[0])),
                  this.touch1 &&
                    "touch" !== t &&
                    (this.touch1[1] = n.invert(this.touch1[0])),
                  (this.that.__zoom = n),
                  this.emit("zoom"),
                  this
                );
              },
              end: function () {
                return (
                  0 == --this.active &&
                    (l.splice(this.index, 1),
                    (this.index = -1),
                    this.emit("end")),
                  this
                );
              },
              emit: function (t) {
                Y(new Ho(y, t, this.that.__zoom), f.apply, f, [
                  t,
                  this.that,
                  this.args,
                ]);
              },
            }),
            (y.wheelDelta = function (t) {
              return arguments.length
                ? ((o = "function" == typeof t ? t : Yo(+t)), y)
                : o;
            }),
            (y.filter = function (t) {
              return arguments.length
                ? ((e = "function" == typeof t ? t : Yo(!!t)), y)
                : e;
            }),
            (y.touchable = function (t) {
              return arguments.length
                ? ((s = "function" == typeof t ? t : Yo(!!t)), y)
                : s;
            }),
            (y.extent = function (t) {
              return arguments.length
                ? ((r =
                    "function" == typeof t
                      ? t
                      : Yo([
                          [+t[0][0], +t[0][1]],
                          [+t[1][0], +t[1][1]],
                        ])),
                  y)
                : r;
            }),
            (y.scaleExtent = function (t) {
              return arguments.length
                ? ((u[0] = +t[0]), (u[1] = +t[1]), y)
                : [u[0], u[1]];
            }),
            (y.translateExtent = function (t) {
              return arguments.length
                ? ((a[0][0] = +t[0][0]),
                  (a[1][0] = +t[1][0]),
                  (a[0][1] = +t[0][1]),
                  (a[1][1] = +t[1][1]),
                  y)
                : [
                    [a[0][0], a[0][1]],
                    [a[1][0], a[1][1]],
                  ];
            }),
            (y.constrain = function (t) {
              return arguments.length ? ((i = t), y) : i;
            }),
            (y.duration = function (t) {
              return arguments.length ? ((c = +t), y) : c;
            }),
            (y.interpolate = function (t) {
              return arguments.length ? ((h = t), y) : h;
            }),
            (y.on = function () {
              var t = f.on.apply(f, arguments);
              return t === f ? y : t;
            }),
            (y.clickDistance = function (t) {
              return arguments.length ? ((v = (t = +t) * t), y) : Math.sqrt(v);
            }),
            y
          );
        },
        rs = e(0);
      e.d(n, "client", function () {
        return Jc;
      }),
        e.d(n, "canvas", function () {
          return Zc;
        }),
        e.d(n, "canvasSelection", function () {
          return Is;
        });
      /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
      var is,
        os,
        ss,
        us = function () {
          return (us =
            Object.assign ||
            function (t) {
              for (var n, e = 1, r = arguments.length; e < r; e++)
                for (var i in (n = arguments[e]))
                  Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
              return t;
            }).apply(this, arguments);
        };
      !(function (t) {
        (t.update = "update"),
          (t.highlight = "highlight"),
          (t.pause = "pause"),
          (t.start = "start"),
          (t.stop = "stop"),
          (t.cancel = "cancel"),
          (t.broadcast = "broadcast");
      })(is || (is = {})),
        (function (t) {
          (t.broadcast = "broadcast"),
            (t.error = "error"),
            (t.click = "click"),
            (t.hover = "hover");
        })(os || (os = {})),
        (function (t) {
          (t.attribute = "attribute"), (t.unknown = "unknown");
        })(ss || (ss = {}));
      var as = function (t, n) {
          for (var e = {}, r = Object.keys(t), i = 0; i < r.length; i++) {
            var o = r[i];
            e[o] = n(o, t[o], i);
          }
          return e;
        },
        cs = function (t) {
          return Object.keys(t).map(function (n) {
            return t[n];
          });
        },
        hs = function (t) {
          return !isNaN(t) && "" !== t;
        },
        ls = function (t) {
          return "object" == typeof t && null !== t && !Array.isArray(t);
        },
        fs = function (t) {
          return 0 === Object.keys(t).length;
        },
        ps = function (t) {
          return (
            (Array.isArray(t)
              ? t.find(function (t) {
                  return t instanceof Error;
                })
              : "object" == typeof t
              ? Object.values(t).find(function (t) {
                  return t instanceof Error;
                })
              : t) || t
          );
        },
        ds = function (t, n) {
          return Object.entries(t).reduce(function (t, e, r) {
            var i,
              o = e[0],
              s = e[1];
            return us({}, t, n(o, s, r) ? (((i = {})[o] = s), i) : {});
          }, {});
        };
      function vs(t, n) {
        var e = t(
          n,
          function () {
            return e;
          },
          function (n) {
            return vs(t, n);
          }
        );
        return e;
      }
      function ys(t, n) {
        return Object.setPrototypeOf(t, n);
      }
      var gs,
        _s = function (t, n, e, r) {
          return "function" == typeof e
            ? e("function" == typeof n ? n(t.data[r], r) : n)
            : e;
        },
        ms = function (t, n, e) {
          return void 0 === t.parent
            ? _s(t, n, e, 0)
            : ms(
                t.parent,
                n,
                (function (t, n, e) {
                  var r;
                  return "function" == typeof e && null === t.data
                    ? function (n) {
                        var r;
                        return (
                          ((r = {})[t.name] = t.ids.reduce(function (t, r) {
                            var i;
                            return us({}, t, (((i = {})[r] = e(n)), i));
                          }, {})),
                          r
                        );
                      }
                    : (((r = {})[t.name] = t.ids.reduce(function (r, i, o) {
                        var s;
                        return us({}, r, (((s = {})[i] = _s(t, n, e, o)), s));
                      }, {})),
                      r);
                })(t, n, e)
              );
        },
        xs = function (t, n, e) {
          var r = { attributes: ms(t, n, e), animation: t.animation };
          return t.highlight
            ? { type: "highlight", queue: t.queue, data: r }
            : { type: "update", queue: t.queue, data: r };
        },
        bs = function (t, n, e) {
          var r = null === e ? null : [String(e)];
          return { type: n, queue: t.queue, data: { queues: r } };
        },
        ws = function (t, n) {
          var e = Object.keys(t).reduce(function (e, r) {
            var i;
            return us(
              {},
              e,
              (((i = {})[r] =
                ls(t[r]) && ls(n[r])
                  ? ws(t[r], n[r])
                  : void 0 !== n[r]
                  ? n[r]
                  : t[r]),
              i)
            );
          }, {});
          return us({}, n, e);
        },
        ks = function (t, n, e) {
          if (
            (fs(t.animation) ||
              (1 === Object.keys(t.animation).length &&
                void 0 !== t.animation["**"])) &&
            "function" != typeof n
          )
            return ws(t.animation, { "**": e(n) });
          var r = ms(t, n, function (t) {
            return { "**": e(t) };
          });
          return ws(t.animation, r);
        },
        Ms = function (t, n, e) {
          t[n] = e;
        },
        Es = function (t, n) {
          void 0 !== t[n] && t[n]();
        },
        Ss = function (t, n, e) {
          return {
            visible: function (e) {
              return (
                t.client.dispatch(
                  xs(t, e, function (t) {
                    return { visible: t };
                  })
                ),
                n()
              );
            },
            add: function () {
              return (
                t.client.dispatch(
                  xs(
                    us({}, t, { data: t.ids }),
                    function (t, n) {
                      return n;
                    },
                    function (n) {
                      return us(
                        { visible: !0 },
                        t.initattr ? t.initattr[n] : {}
                      );
                    }
                  )
                ),
                n().duration(0)
              );
            },
            remove: function () {
              return (
                t.client.dispatch(
                  xs(t, !1, function (t) {
                    return null;
                  })
                ),
                n()
              );
            },
            set: function (e) {
              return (
                t.client.dispatch(
                  xs(t, e, function (t) {
                    return t;
                  })
                ),
                n()
              );
            },
            eventQ: function (n) {
              return (
                void 0 === n && (n = "default"),
                e(us({}, t, { queue: null === n ? null : String(n) }))
              );
            },
            duration: function (n) {
              return e(
                us({}, t, {
                  animation: ks(t, n, function (t) {
                    return { duration: t };
                  }),
                })
              );
            },
            ease: function (n) {
              return e(
                us({}, t, {
                  animation: ks(t, n, function (t) {
                    return { ease: t };
                  }),
                })
              );
            },
            highlight: function (n) {
              return e(
                us({}, t, {
                  highlight: !0,
                  animation:
                    void 0 !== n
                      ? ks(t, n, function (t) {
                          return { linger: t };
                        })
                      : t.animation,
                })
              );
            },
            data: function (n) {
              return e(
                us({}, t, {
                  data:
                    null === n
                      ? null
                      : t.ids.map(function (e, r) {
                          return "function" == typeof n
                            ? n(null === t.data ? null : t.data[r], r)
                            : Array.isArray(n)
                            ? n[r]
                            : n;
                        }),
                })
              );
            },
            pause: function (e) {
              return (
                t.client.dispatch({
                  type: is.pause,
                  queue: t.queue,
                  data: { duration: e },
                }),
                n()
              );
            },
            stop: function (e) {
              return (
                void 0 === e && (e = "default"),
                t.client.dispatch(bs(t, "stop", e)),
                n()
              );
            },
            stopall: function () {
              return t.client.dispatch(bs(t, "stop", null)), n();
            },
            start: function (e) {
              return (
                void 0 === e && (e = "default"),
                t.client.dispatch(bs(t, "start", e)),
                n()
              );
            },
            startall: function () {
              return t.client.dispatch(bs(t, "start", null)), n();
            },
            cancel: function (e) {
              return (
                void 0 === e && (e = "default"),
                t.client.dispatch(bs(t, "cancel", e)),
                n()
              );
            },
            cancelall: function () {
              return t.client.dispatch(bs(t, "cancel", null)), n();
            },
            broadcast: function (e) {
              return (
                t.client.dispatch({
                  type: is.broadcast,
                  queue: t.queue,
                  data: { message: "broadcast-" + e },
                }),
                n()
              );
            },
            listen: function (e, r) {
              return Ms(t.listeners, "broadcast-" + e, r), n();
            },
            callback: function (e) {
              var r = "callback-" + Math.random().toString(36).substr(2, 9);
              return (
                Ms(t.listeners, r, e),
                t.client.dispatch({
                  type: is.broadcast,
                  queue: t.queue,
                  data: { message: r },
                }),
                n()
              );
            },
          };
        },
        As = function (t, n) {
          return {
            svgattr: function (e, r) {
              return (
                t.client.dispatch(
                  xs(t, r, function (t) {
                    var n;
                    return { svgattr: ((n = {}), (n[e] = t), n) };
                  })
                ),
                n()
              );
            },
          };
        },
        Os = function (t, n, e) {
          return ys(
            us(
              {
                text: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { text: t };
                      })
                    ),
                    n()
                  );
                },
                align: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { align: t };
                      })
                    ),
                    n()
                  );
                },
                pos: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { pos: t };
                      })
                    ),
                    n()
                  );
                },
                radius: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { radius: t };
                      })
                    ),
                    n()
                  );
                },
                angle: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { angle: t };
                      })
                    ),
                    n()
                  );
                },
                rotate: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { rotate: t };
                      })
                    ),
                    n()
                  );
                },
                color: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { color: t };
                      })
                    ),
                    n()
                  );
                },
                font: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { font: t };
                      })
                    ),
                    n()
                  );
                },
                size: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { size: t };
                      })
                    ),
                    n()
                  );
                },
              },
              As(t, n)
            ),
            Ss(t, n, e)
          );
        },
        Ns = function (t) {
          return vs(Os, us({}, t, { name: "labels" }));
        },
        Ps = function (t, n, e) {
          return ys(
            us(
              {
                label: function (t) {
                  return void 0 === t && (t = "value"), n().labels([t]);
                },
                labels: function (n) {
                  return Ns(
                    us({}, t, {
                      parent: t,
                      ids: n.map(function (t) {
                        return String(t);
                      }),
                      data: null,
                      initattr: void 0,
                    })
                  );
                },
                shape: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { shape: t };
                      })
                    ),
                    n()
                  );
                },
                color: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { color: t };
                      })
                    ),
                    n()
                  );
                },
                size: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { size: t };
                      })
                    ),
                    n()
                  );
                },
                pos: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { pos: t };
                      })
                    ),
                    n()
                  );
                },
                fixed: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { fixed: t };
                      })
                    ),
                    n()
                  );
                },
                draggable: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { draggable: t };
                      })
                    ),
                    n()
                  );
                },
                click: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, !0, function (t) {
                        return { click: t };
                      })
                    ),
                    t.ids.forEach(function (n, r) {
                      Ms(t.listeners, "click-node-" + n, function () {
                        return e(t.data[r], r);
                      });
                    }),
                    n()
                  );
                },
                hoverin: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, !0, function (t) {
                        return { hover: t };
                      })
                    ),
                    t.ids.forEach(function (n, r) {
                      Ms(t.listeners, "hoverin-node-" + n, function () {
                        return e(t.data[r], r);
                      });
                    }),
                    n()
                  );
                },
                hoverout: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, !0, function (t) {
                        return { hover: t };
                      })
                    ),
                    t.ids.forEach(function (n, r) {
                      Ms(t.listeners, "hoverout-node-" + n, function () {
                        return e(t.data[r], r);
                      });
                    }),
                    n()
                  );
                },
              },
              As(t, n)
            ),
            Ss(t, n, e)
          );
        },
        Ts = function (t, n, e) {
          return ys(
            us(
              {
                traverse: function (n) {
                  return (
                    void 0 === n &&
                      (n = function (n, e) {
                        return t.initattr[e].source;
                      }),
                    e(
                      us({}, t, {
                        animation: ks(t, n, function (t) {
                          return {
                            type: "traverse",
                            data: { source: String(t) },
                          };
                        }),
                      })
                    )
                  );
                },
                label: function (t) {
                  return void 0 === t && (t = "weight"), n().labels([t]);
                },
                labels: function (n) {
                  return Ns(
                    us({}, t, {
                      parent: t,
                      ids: n.map(function (t) {
                        return String(t);
                      }),
                      data: null,
                      initattr: void 0,
                    })
                  );
                },
                directed: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { directed: t };
                      })
                    ),
                    n()
                  );
                },
                length: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { length: t };
                      })
                    ),
                    n()
                  );
                },
                thickness: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { thickness: t };
                      })
                    ),
                    n()
                  );
                },
                color: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { color: t };
                      })
                    ),
                    n()
                  );
                },
                flip: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { flip: t };
                      })
                    ),
                    n()
                  );
                },
                curve: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { curve: t };
                      })
                    ),
                    n()
                  );
                },
                path: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { path: t };
                      })
                    ),
                    n()
                  );
                },
              },
              As(t, n)
            ),
            Ss(t, n, e)
          );
        },
        zs = function (t, n, e) {
          return ys(
            us(
              {
                node: function (t) {
                  return n().nodes([t]);
                },
                nodes: function (n) {
                  return (
                    (e = us({}, t, {
                      parent: t,
                      ids: n.map(function (t) {
                        return String(t);
                      }),
                      data: n.slice(),
                      initattr: void 0,
                    })),
                    vs(Ps, us({}, e, { name: "nodes" }))
                  );
                  var e;
                },
                edge: function (t) {
                  return n().edges([t]);
                },
                edges: function (n) {
                  var e,
                    r = n.map(function (t) {
                      var n = t[0],
                        e = t[1],
                        r = t[2],
                        i = [String(n), String(e)].sort();
                      return (
                        i[0] +
                        "-" +
                        i[1] +
                        (void 0 !== r ? "-" + String(r) : "")
                      );
                    }),
                    i = n.map(function (t) {
                      var n = t[0],
                        e = t[1];
                      return { source: String(n), target: String(e) };
                    });
                  return (
                    (e = us({}, t, {
                      parent: t,
                      ids: r,
                      data: n.slice(),
                      initattr: i,
                    })),
                    vs(Ts, us({}, e, { name: "edges" }))
                  );
                },
                label: function (t) {
                  return void 0 === t && (t = "title"), n().labels([t]);
                },
                labels: function (n) {
                  return Ns(
                    us({}, t, {
                      parent: t,
                      ids: n.map(function (t) {
                        return String(t);
                      }),
                      data: null,
                      initattr: void 0,
                    })
                  );
                },
                size: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { size: t };
                      })
                    ),
                    n()
                  );
                },
                edgelengths: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { edgelengths: t };
                      })
                    ),
                    n()
                  );
                },
                pan: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { pan: t };
                      })
                    ),
                    n()
                  );
                },
                zoom: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { zoom: t };
                      })
                    ),
                    n()
                  );
                },
                panlimit: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { panlimit: t };
                      })
                    ),
                    n()
                  );
                },
                zoomlimit: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { zoomlimit: t };
                      })
                    ),
                    n()
                  );
                },
                zoomkey: function (e) {
                  return (
                    t.client.dispatch(
                      xs(t, e, function (t) {
                        return { zoomkey: t };
                      })
                    ),
                    n()
                  );
                },
              },
              As(t, n)
            ),
            Ss(t, n, e)
          );
        },
        Is = function (t, n) {
          var e = us(
            {},
            {
              name: "",
              ids: [],
              listeners: {},
              queue: "default",
              animation: {},
              highlight: !1,
            },
            { client: n, name: "canvas", ids: [String(t)], data: [t] }
          );
          return (
            n.subscribe(function (t) {
              return (function (t, n) {
                t.type === os.broadcast
                  ? Es(n, t.data.message)
                  : t.type === os.click
                  ? Es(n, "click-node-" + t.data.id)
                  : t.type === os.hover
                  ? Es(
                      n,
                      (t.data.entered ? "hoverin" : "hoverout") +
                        "-node-" +
                        t.data.id
                    )
                  : t.type === os.error && console.error(t.data.message);
              })(t, e.listeners);
            }),
            vs(zs, e)
          );
        },
        Cs = function (t, n) {
          return t.queues.hasOwnProperty(n)
            ? t.queues[n]
            : (function (t) {
                return { events: [], busy: !1, stopped: t.stopped };
              })(t);
        },
        Ls = function (t, n, e) {
          var r;
          return us({}, t, {
            queues: us(
              {},
              t.queues,
              ((r = {}), (r[n] = us({}, Cs(t, n), e)), r)
            ),
          });
        },
        js = function (t, n, e) {
          void 0 === e && (e = !1);
          var r = Cs(t, n);
          if (null === n || (!e && r.busy))
            return { state: t, execute: function () {} };
          if (r.stopped || 0 === r.events.length)
            return { state: Ls(t, n, { busy: !1 }), execute: function () {} };
          if (null === n || (!e && r.busy))
            return { state: t, execute: function () {} };
          var i = r.events[0];
          return {
            state: Ls(t, n, {
              events: r.events.slice(1),
              busy: !0,
              current: i,
            }),
            execute: function () {
              if (i.type === is.pause) {
                var e = 1e3 * i.data.duration;
                setTimeout(function () {
                  return t.callback(i, n);
                }, e);
              } else t.callback(i, n);
            },
          };
        },
        qs = function (t, n) {
          return n.type === is.start
            ? (function (t, n) {
                return (function (t, n, e, r) {
                  return n.reduce(
                    function (t, n) {
                      var i = e(t.state, n),
                        o = r(i, n);
                      return {
                        state: o.state,
                        execute: function () {
                          o.execute(), t.execute();
                        },
                      };
                    },
                    { state: t, execute: function () {} }
                  );
                })(
                  null === n ? us({}, t, { stopped: !1 }) : t,
                  null === n ? Object.keys(t.queues) : n,
                  function (t, n) {
                    return Ls(t, n, { stopped: !1 });
                  },
                  function (t, n) {
                    return js(t, n);
                  }
                );
              })(t, n.data.queues)
            : n.type === is.stop
            ? (function (t, n) {
                var e = null === n ? us({}, t, { stopped: !0 }) : t;
                return {
                  state: (null === n ? Object.keys(t.queues) : n).reduce(
                    function (t, n) {
                      return Ls(t, n, { stopped: !0 });
                    },
                    e
                  ),
                  execute: function () {},
                };
              })(t, n.data.queues)
            : (function (t, n) {
                var e = null === n ? us({}, t, { queues: {} }) : t;
                return {
                  state: (null === n ? Object.keys(t.queues) : n).reduce(
                    function (t, n) {
                      return Ls(t, n, { events: [], busy: !1 });
                    },
                    e
                  ),
                  execute: function () {},
                };
              })(t, n.data.queues);
        },
        Ds = function (t, n, e, r) {
          if (null === n || Cs(t, n).current === e) {
            if (
              (function (t) {
                return (
                  t.type === is.start ||
                  t.type === is.stop ||
                  t.type === is.cancel
                );
              })(e)
            ) {
              var i = qs(t, e),
                o = js(i.state, n, !0);
              return {
                state: o.state,
                execute: function () {
                  i.execute(), o.execute();
                },
              };
            }
            var s = js(t, n, !0);
            return {
              state: s.state,
              execute: function () {
                r(e), s.execute();
              },
            };
          }
          return { state: t, execute: function () {} };
        },
        Vs = Object.freeze({
          select: K,
          selectAll: function (t) {
            return "string" == typeof t
              ? new U(
                  [document.querySelectorAll(t)],
                  [document.documentElement]
                )
              : new U([null == t ? [] : t], F);
          },
          event: V,
          transition: ke,
          ease: r,
          dispatch: ht,
          timer: kt,
          drag: Er,
          shape: i,
          zoom: es,
          zoomIdentity: Uo,
        }),
        Bs = function (t) {
          return void 0 !== t.duration;
        },
        Rs = {
          navy: "#00229e",
          blue: "#2957c4",
          aqua: "#19c3d6",
          teal: "#05827d",
          olive: "#006333",
          green: "#05914d",
          lime: "#12bc6b",
          yellow: "#cc9918",
          orange: "#dd7d0f",
          red: "#af1c1c",
          pink: "#d14db0",
          fuchsia: "#bc2990",
          purple: "#a31578",
          maroon: "#7c0606",
          white: "#ffffff",
          lightgray: "#b5b5b5",
          lightgrey: "#b5b5b5",
          gray: "#969696",
          grey: "#969696",
          darkgray: "#323232",
          darkgrey: "#323232",
          black: "#111111",
        },
        Gs = function (t) {
          var n = Hs(t.trim()).toLowerCase();
          return Object.keys(Rs).includes(n) ? Rs[n] : t;
        },
        Xs = function (t) {
          return (
            t.split("").reduce(function (t, n) {
              var e = (t << 5) - t + n.charCodeAt(0);
              return e & e;
            }, 0) >>> 0
          ).toString(16);
        },
        Ys = function (t, n, e) {
          var r = t.select(n);
          return r.empty() ? e(t) : r;
        },
        Hs = function (t) {
          return t
            .split("-")
            .map(function (t) {
              return t.charAt(0).toUpperCase() + t.substr(1);
            })
            .join("");
        },
        Fs = function (t) {
          return K("string" == typeof t ? "#" + t : t);
        },
        Us = function (t) {
          var n = Fs(t);
          return Ys(n, ".algorithmx", function (t) {
            return t.append("svg").classed("algorithmx", !0);
          });
        },
        Ws = function (t) {
          return Ys(t, "g", function (t) {
            return t.append("g");
          });
        },
        Qs = function (t) {
          return Ys(t, ".nodes", function (t) {
            return t.append("g").classed("nodes", !0);
          });
        },
        Ks = function (t, n) {
          var e = Xs(n);
          return Ys(t, "#node-" + e, function (t) {
            return t.append("g").attr("id", "node-" + e);
          });
        },
        $s = function (t, n) {
          var e = Xs(n);
          return Ys(t, "#edge-" + e, function (t) {
            return t.append("g").attr("id", "edge-" + e);
          });
        },
        Js = function (t) {
          var n = as(t.attr, function (n) {
            return tu(t, n);
          });
          return Zs(n);
        },
        Zs = function (t) {
          var n = !fs(
              ds(t, function (t, n) {
                return void 0 !== n.highlight;
              })
            )
              ? as(t, function (t, n) {
                  return void 0 !== n.highlight ? n.highlight : n.attr;
                })
              : void 0,
            e = ds(
              as(t, function (t, n) {
                return n.changes;
              }),
              function (t, n) {
                return void 0 !== n;
              }
            ),
            r = fs(e) ? void 0 : e,
            i = Object.entries(t).reduce(
              function (t, n, e) {
                n[0];
                var r = n[1];
                return !1 === t[1] &&
                  void 0 !== r.changes &&
                  void 0 !== r.animation
                  ? [r.animation, !0]
                  : void 0 === t[0] && void 0 !== r.animation
                  ? [r.animation, !1]
                  : t;
              },
              [void 0, !1]
            )[0],
            o = as(t, function (t, n) {
              return n.attr;
            });
          return {
            name: Object.keys(t).reduce(function (t, n, e) {
              return t + (0 === e ? "" : "-") + n;
            }),
            attr: o,
            changes: r,
            animation: i,
            highlight: n,
          };
        },
        tu = function (t, n) {
          return {
            name: n,
            attr: t.attr[n],
            animation: (t.animation || {})[n],
            changes: (t.changes || {})[n],
            highlight: (t.highlight || {})[n],
          };
        },
        nu = function (t) {
          return void 0 !== t.changes || void 0 !== t.highlight;
        },
        eu = function (t, n) {
          var e = n.reduce(function (n, e) {
            var r;
            return us({}, n, (((r = {})[e] = t.attr[e]), r));
          }, {});
          return us({}, t, { changes: us({}, t.changes || {}, e) });
        },
        ru = function () {
          return void 0 !== typeof window;
        },
        iu = function (t, n, e) {
          return ru() ? e(t.transition(n)) : t;
        },
        ou = function (t, n) {
          return ru() ? n(t.transition()) : t;
        },
        su = function (t) {
          return 1e3 * t;
        },
        uu = function (t) {
          return void 0 === t || 0 === t.duration;
        },
        au = function (t, n) {
          return uu(n)
            ? t.duration(0)
            : t
                .duration(su(n.duration))
                .ease(((e = n.ease), r["ease" + Hs(e)]));
          var e;
        },
        cu = function (t, n, e) {
          return uu(e)
            ? (t.interrupt(n), t)
            : iu(t, n, function (t) {
                return au(t, e);
              });
        },
        hu = function (t, n, e) {
          nu(n) && e(t, n);
        },
        lu = function (t, n, e) {
          return void 0 !== n.highlight ? pu(t, n, e, e) : fu(t, n, e);
        },
        fu = function (t, n, e) {
          return void 0 !== n.changes
            ? e(cu(t, n.name, n.animation), n.attr)
            : t;
        },
        pu = function (t, n, e, r) {
          var i = e(cu(t, n.name, n.animation), n.highlight),
            o = n.animation ? su(n.animation.linger) : 0;
          return r(
            ou(i, function (t) {
              return au(t.delay(o), n.animation);
            }),
            n.attr
          );
        },
        du = function (t, n) {
          Object.entries(t.attr).forEach(function (e) {
            var r = e[0],
              i = e[1],
              o = tu(t, r);
            null !== i && nu(o) && n(r, o);
          });
        },
        vu = function (t, n) {
          Object.entries(t.changes || {}).forEach(function (e) {
            var r = e[0],
              i = e[1],
              o = tu(t, r);
            null === i && n(r, o);
          });
        },
        yu = {
          path: "M 0,0 m -5,-5 L 5,0 L -5,5 Z",
          viewBox: "-5 -5 10 10",
          size: 10,
        },
        gu = function (t, n) {
          var e = t.select("defs").select(".marker-" + n);
          return e.empty()
            ? "marker-" + Math.random().toString(36).substr(2, 9)
            : e.attr("id");
        },
        _u = function (t, n) {
          var e = Ys(t, "defs", function (t) {
              return t.insert("svg:defs", ":first-child");
            }),
            r = gu(t, n);
          return Ys(e, "#" + r, function (t) {
            var e = t
              .append("svg:marker")
              .attr("id", r)
              .classed("marker-" + n, !0);
            return e.append("path"), e;
          });
        },
        mu = function (t, n) {
          return du(t, function (t, e) {
            e.attr.visible && n(t, e);
          });
        },
        xu = function (t, n, e, r) {
          return lu(t, r, function (t, r) {
            return t.attr(n, e(r));
          });
        },
        bu = function (t, n) {
          var e = function (t, n) {
            return [
              n.includes("@") ? t.selectAll(n.split("@")[1]) : t,
              n.includes("@") ? n.split("@")[0] : n,
            ];
          };
          du(tu(n, "svgattr"), function (n, r) {
            var i = e(t, r.name),
              o = i[0],
              s = i[1];
            xu(
              o,
              s,
              function (t) {
                return t;
              },
              r
            );
          }),
            vu(tu(n, "svgattr"), function (n, r) {
              var i = e(t, r.name),
                o = i[0],
                s = i[1];
              xu(
                o,
                s,
                function (t) {
                  return null;
                },
                r
              );
            });
        },
        wu = function (t, n) {
          hu(t, n, function (t, n) {
            var e, r;
            uu(n.animation) ||
              (!0 === n.attr
                ? (function (t, n) {
                    t.attr("opacity", "0");
                    var e = cu(t, "visible-fade", n).attr("opacity", "1");
                    ou(e, function (t) {
                      return t;
                    }).attr("opacity", null);
                  })(t, n.animation)
                : ((e = t),
                  (r = n.animation),
                  e.attr("opacity", "1"),
                  cu(e, "visible-fade", r).attr("opacity", "0")));
          });
        },
        ku = function (t, n) {
          hu(t, n, function (t, n) {
            !1 === n.attr &&
              (uu(n.animation)
                ? t.remove()
                : iu(t, "remove", function (t) {
                    return t.delay(su(n.animation.duration));
                  }).remove());
          });
        },
        Mu = function (t) {
          var n,
            e = tu(t, "visible");
          return nu(e) && !0 === e.attr ? eu((n = t), Object.keys(n.attr)) : t;
        },
        Eu = function (t, n, e) {
          var r = Mu(n),
            i = tu(n, "visible");
          nu(i) && !0 === i.attr && t().remove();
          var o = t();
          e(o, r), wu(o, i), ku(o, i);
        },
        Su = function (t, n, e) {
          du(n, function (n, r) {
            return Eu(
              function () {
                return t(n);
              },
              r,
              e
            );
          }),
            vu(n, function (n, e) {
              return (
                (r = t(n)),
                (i = tu(
                  us({}, e, {
                    attr: { visible: !1 },
                    changes: { visible: !1 },
                  }),
                  "visible"
                )),
                wu(r, i),
                void ku(r, i)
              );
              var r, i;
            });
        },
        Au = function (t) {
          return t.node().getTotalLength();
        },
        Ou = function (t) {
          var n = tu(t, "color");
          return (
            !!(n.animation && n.animation.data && n.animation.data.source) &&
            t.attr.source !== t.animation.color.data.source
          );
        },
        Nu = function (t, n, e, r) {
          return Bs(t)
            ? t.attrTween("stroke-dashoffset", function () {
                var t = e();
                return r
                  ? function (e) {
                      return (t - (n ? -e : e) * t).toString();
                    }
                  : function (e) {
                      return (2 * t - (n ? -e : e) * t).toString();
                    };
              })
            : t.attr("stroke-dashoffset", r ? 0 : e());
        },
        Pu = function (t, n, e) {
          var r = tu(n, "color"),
            i = Ou(n),
            o = e(),
            s = Au(t);
          if (
            (o.attr("stroke-dasharray", s).attr("stroke-dashoffset", s),
            void 0 !== r.highlight)
          )
            !(function (t, n, e) {
              var r = tu(e, "color"),
                i = Ou(e);
              n.attr("stroke", Gs(r.highlight)).attr(
                "stroke-width",
                e.attr.thickness + 2
              );
              pu(
                n,
                r,
                function (n) {
                  var r = n.attr("stroke-width", e.attr.thickness);
                  return Nu(
                    r,
                    i,
                    function () {
                      return Au(t);
                    },
                    !0
                  );
                },
                function (e) {
                  e.on("start", function () {
                    var e = Au(t);
                    n.attr("stroke-dasharray", e);
                  });
                  var r = Nu(
                    e,
                    i,
                    function () {
                      return Au(t);
                    },
                    !1
                  );
                  return ou(r, function (t) {
                    return t.duration(0);
                  }).remove();
                }
              );
            })(t, o, n);
          else {
            o
              .attr("stroke", Gs(r.attr))
              .attr("stroke-width", n.attr.thickness + 2),
              lu(o, r, function (e) {
                var r = e.attr("stroke-width", n.attr.thickness);
                return Nu(
                  r,
                  i,
                  function () {
                    return Au(t);
                  },
                  !0
                );
              });
            var u = su(r.animation.duration),
              a = u / 3;
            iu(t, r.name, function (t) {
              return t.delay(u).duration(a);
            }).attr("stroke", Gs(r.attr));
            var c = ou(o.attr("opacity", 1), function (t) {
              return t.delay(u + a).duration(a);
            }).attr("opacity", 0);
            ou(c, function (t) {
              return t.duration(0);
            }).remove();
          }
        };
      !(function (t) {
        (t.Number = "number"),
          (t.String = "string"),
          (t.Boolean = "boolean"),
          (t.Array = "array"),
          (t.Record = "record"),
          (t.Lookup = "lookup"),
          (t.Any = "any");
      })(gs || (gs = {}));
      var Tu,
        zu = function (t, n) {
          return us({}, t, {
            entries: us({}, n.entries, t.entries),
            keyOrder: n.keyOrder.concat(t.keyOrder),
          });
        },
        Iu = { visible: !0 },
        Cu = {
          type: gs.Record,
          entries: { visible: { type: gs.Boolean } },
          keyOrder: ["visible"],
        },
        Lu = { visible: { type: "normal" } },
        ju = { svgattr: { type: gs.Lookup, entry: { type: gs.String } } },
        qu = ["svgattr"],
        Du = { svgattr: {} },
        Vu = function (t) {
          return (t * Math.PI) / 180;
        },
        Bu = function (t) {
          return (180 * t) / Math.PI;
        },
        Ru = function (t) {
          return (
            (t < 0 ? 2 * Math.PI - (-t % (2 * Math.PI)) : t) % (2 * Math.PI)
          );
        },
        Gu = function (t, n) {
          var e = t[0],
            r = t[1];
          return [
            e * Math.cos(n) - r * Math.sin(n),
            r * Math.cos(n) + e * Math.sin(n),
          ];
        },
        Xu = function (t, n) {
          var e = t[0],
            r = t[1];
          return [e + n[0], r + n[1]];
        };
      !(function (t) {
        (t["top-left"] = "top-left"),
          (t["top-middle"] = "top-middle"),
          (t["top-right"] = "top-right"),
          (t["middle-left"] = "middle-left"),
          (t.middle = "middle"),
          (t["middle-right"] = "middle-right"),
          (t["bottom-left"] = "bottom-left"),
          (t["bottom-middle"] = "bottom-middle"),
          (t["bottom-right"] = "bottom-right"),
          (t.radial = "radial");
      })(Tu || (Tu = {}));
      var Yu,
        Hu = {
          "top-left": (3 * Math.PI) / 4,
          "top-middle": (1 * Math.PI) / 2,
          "top-right": (1 * Math.PI) / 4,
          "middle-left": Math.PI,
          middle: (3 * Math.PI) / 2,
          "middle-right": 0,
          "bottom-left": (5 * Math.PI) / 4,
          "bottom-middle": (3 * Math.PI) / 2,
          "bottom-right": (7 * Math.PI) / 4,
          radial: 0,
        },
        Fu = zu(
          {
            entries: us(
              {
                text: { type: gs.String },
                align: { type: gs.String, validValues: cs(Tu) },
                pos: {
                  type: gs.Record,
                  entries: { x: { type: gs.Number }, y: { type: gs.Number } },
                  keyOrder: ["x", "y"],
                },
                radius: { type: gs.Number },
                angle: { type: gs.Number },
                rotate: { type: gs.Boolean },
                color: { type: gs.String },
                font: { type: gs.String },
                size: { type: gs.Number },
              },
              ju
            ),
            type: gs.Record,
            keyOrder: [
              "text",
              "align",
              "pos",
              "radius",
              "angle",
              "rotate",
              "align",
              "color",
              "font",
              "size",
            ].concat(qu),
          },
          Cu
        ),
        Uu = us(
          {},
          Iu,
          {
            text: "",
            align: "bottom-middle",
            pos: { x: 0, y: 0 },
            radius: 0,
            angle: 90,
            rotate: !1,
            color: Rs.gray,
            font: "Arial, Helvetica, sans-serif",
            size: 12,
          },
          Du
        ),
        Wu = us({}, Lu),
        Qu = function (t, n) {
          if (n) return Ru(t) < Math.PI ? "bottom-middle" : "top-middle";
          var e = Ru(t + Math.PI),
            r = Object.keys(Hu)
              .filter(function (t) {
                return "middle" !== t && "radial" !== t;
              })
              .sort(function (t, n) {
                return Hu[t] < Hu[n] ? -1 : 0;
              });
          return r.find(function (t, n) {
            var i = 0 === n ? -Hu[r[1]] : Hu[r[n - 1]],
              o = Hu[r[n]],
              s = n === r.length - 1 ? 2 * Math.PI : Hu[r[n + 1]];
            return e > (i + o) / 2 && e <= (o + s) / 2;
          });
        },
        Ku = function (t) {
          return us({}, Uu, { text: t });
        },
        $u = function (t) {
          return "top-left" === t || "top-middle" === t || "top-right" === t;
        },
        Ju = function (t) {
          return (
            "bottom-left" === t || "bottom-middle" === t || "bottom-right" === t
          );
        },
        Zu = function (t, n) {
          var e,
            r,
            i,
            o =
              ((r = (e = n).attr.align),
              (i =
                e.changes &&
                (void 0 !== e.changes.align ||
                  void 0 !== e.changes.angle ||
                  void 0 !== e.changes.rotate)),
              us({}, tu(e, "align"), {
                attr: "radial" === r ? Qu(Vu(e.attr.angle), e.attr.rotate) : r,
                changes:
                  "radial" === r && i
                    ? r
                    : e.changes
                    ? e.changes.align
                    : void 0,
              })),
            s = Ys(t, "text", function (t) {
              return t.append("text").attr("pointer-events", "none");
            }),
            u = Zs({ text: tu(n, "text"), align: o });
          lu(s, u, function (t, n) {
            return (
              (function (t, n, e) {
                var r = n.split("\n");
                t.selectAll("tspan").remove(),
                  r.forEach(function (n, i) {
                    var o = $u(e)
                      ? 0
                      : Ju(e)
                      ? 1.2 * (r.length - 1)
                      : ((r.length - 1) / 2) * 1.2;
                    t.append("tspan")
                      .attr("x", 0)
                      .attr("dy", 0 === i ? "-" + o + "em" : "1.2em")
                      .text(n);
                  });
              })(s, n.text, n.align),
              t
            );
          });
          var a = Zs({
            x: tu(tu(n, "pos"), "x"),
            y: tu(tu(n, "pos"), "y"),
            radius: tu(n, "radius"),
            angle: tu(n, "angle"),
            rotate: tu(n, "rotate"),
            align: o,
          });
          lu(s, a, function (t, n) {
            return (function (t, n) {
              var e = n.radius * Math.cos(n.angle),
                r = n.radius * Math.sin(n.angle),
                i = Ru(-n.angle + Hu[n.align] + Math.PI),
                o = n.rotate ? "rotate(" + Bu(i) + ")" : "";
              return t.attr(
                "transform",
                "translate(" + (n.x + e) + "," + -(n.y + r) + ")" + o
              );
            })(t, us({}, n, { angle: Vu(n.angle) }));
          }),
            (function (t, n) {
              xu(
                t,
                "y",
                function (t) {
                  return $u(t) ? "0.75em" : Ju(t) ? "0em" : "0.25em";
                },
                us({}, n, { name: n.name + "-y" })
              ),
                xu(
                  t,
                  "text-anchor",
                  function (t) {
                    return "top-left" === t ||
                      "middle-left" === t ||
                      "bottom-left" === t
                      ? "start"
                      : "top-right" === t ||
                        "middle-right" === t ||
                        "bottom-right" === t
                      ? "end"
                      : "middle";
                  },
                  us({}, n, { name: n.name + "-x" })
                );
            })(s, o),
            xu(
              s,
              "fill",
              function (t) {
                return Gs(t);
              },
              tu(n, "color")
            ),
            xu(
              s,
              "font-family",
              function (t) {
                return t;
              },
              tu(n, "font")
            ),
            xu(
              s,
              "font-size",
              function (t) {
                return t;
              },
              tu(n, "size")
            ),
            bu(s, n);
        },
        ta = function (t) {
          return Ys(t, ".edge-labels", function (t) {
            return t.append("g").classed("edge-labels", !0);
          });
        },
        na = function (t, n) {
          var e = Ys(t, ".edge-path", function (t) {
              return t
                .append("path")
                .classed("edge-path", !0)
                .attr("fill", "none")
                .attr("stroke-linecap", "round");
            }),
            r = ta(t);
          Su(
            function (t) {
              return (
                (n = r),
                (e = Xs(t)),
                Ys(n, "#label-" + e, function (t) {
                  return t.append("g").attr("id", "label-" + e);
                })
              );
              var n, e;
            },
            tu(n, "labels"),
            Zu
          ),
            xu(
              e,
              "stroke-width",
              function (t) {
                return t;
              },
              tu(n, "thickness")
            ),
            (function (t, n) {
              lu(t, tu(n, "directed"), function (e, r) {
                if (r) {
                  var i = _u(t, "target"),
                    o = yu;
                  return (
                    i
                      .attr("viewBox", o.viewBox)
                      .attr("markerWidth", o.size)
                      .attr("markerHeight", o.size)
                      .attr("markerUnits", "userSpaceOnUse")
                      .attr("orient", "auto")
                      .attr("refX", 0)
                      .attr("refY", 0),
                    i
                      .select("path")
                      .attr("d", o.path)
                      .attr("fill", Gs(n.attr.color)),
                    e
                  );
                }
                return t.select("defs").remove(), e;
              });
            })(t, n),
            xu(
              e,
              "marker-end",
              function (n) {
                return n ? "url(#" + gu(t, "target") + ")" : null;
              },
              tu(n, "directed")
            );
          !(function (t, n, e, r) {
            var i = tu(r, "color");
            i.animation && "traverse" === i.animation.type
              ? Pu(t, r, e)
              : xu(
                  t,
                  "stroke",
                  function (t) {
                    return Gs(t);
                  },
                  i
                ),
              r.attr.directed &&
                xu(
                  n(),
                  "fill",
                  function (t) {
                    return Gs(t);
                  },
                  i
                );
          })(
            e,
            function () {
              return _u(t, "target").select("path");
            },
            function () {
              return (function (t, n) {
                t.select(".edge-path-overlay").remove();
                var e = t
                  .append("path")
                  .classed("edge-path-overlay", !0)
                  .attr("fill", "none")
                  .attr("stroke-linecap", "butt");
                return (
                  n.attr.directed &&
                    e.attr("marker-end", "url(#" + gu(t, "target")),
                  e
                );
              })(t, n);
            },
            n
          ),
            bu(e, n);
        };
      !(function (t) {
        (t.Width = "x"),
          (t.Height = "y"),
          (t.Radius = "r"),
          (t.Angle = "a"),
          (t.CanvasWidth = "cx"),
          (t.CanvasHeight = "cy");
      })(Yu || (Yu = {}));
      var ea = function (t, n) {
          return ra(t) ? t.entries[n] : ia(t) || oa(t) ? t.entry : t;
        },
        ra = function (t) {
          return t.type === gs.Record;
        },
        ia = function (t) {
          return t.type === gs.Lookup;
        },
        oa = function (t) {
          return t.type === gs.Array;
        },
        sa = function (t) {
          return !ra(t) && !ia(t) && !oa(t);
        };
      function ua(t, n, e, r) {
        return ra(n) || ia(n)
          ? Object.entries(t).reduce(function (t, r) {
              var i = r[0],
                o = r[1];
              return e(t, i, o, ea(n, i));
            }, r)
          : oa(n)
          ? t.reduce(function (t, r, i) {
              return e(t, i, r, ea(n, i));
            }, r)
          : r;
      }
      function aa(t, n, e) {
        return ra(n) || ia(n)
          ? as(t, function (t, r) {
              return e(t, r, ea(n, t));
            })
          : oa(n)
          ? t.map(function (t, r) {
              return e(r, t, ea(n, r));
            })
          : t;
      }
      function ca(t, n, e) {
        if (ha(n, e)) return t;
        if (ra(e) || ia(e)) {
          var r = aa(n, e, function (n, r, i) {
            return void 0 === t[n]
              ? r
              : !ia(e) || (null !== r && null !== t[n])
              ? ca(t[n], r, i)
              : r;
          });
          return us({}, t, r);
        }
        return oa(e)
          ? aa(n, e, function (n, e, r) {
              return void 0 === e ? t[n] : void 0 === t[n] ? e : ca(t[n], e, r);
            })
          : n;
      }
      var ha = function (t, n) {
          return (
            void 0 === t ||
            !((!ia(n) && !ra(n)) || !fs(t)) ||
            !(!oa(n) || 0 !== t.length) ||
            (!sa(n) &&
              ua(
                t,
                n,
                function (t, e, r, i) {
                  return !1 === t ? t : (!ia(n) || null !== r) && ha(r, i);
                },
                !0
              ))
          );
        },
        la = function (t) {
          return ia(t) || ra(t) ? {} : oa(t) ? [] : void 0;
        },
        fa = function (t, n) {
          return ds(n || {}, function (n, e) {
            return void 0 === t[n] && null !== e;
          });
        },
        pa = function (t, n, e) {
          if (ia(n) || ra(n))
            return ua(
              t,
              n,
              function (t, n, r, i) {
                var o,
                  s = e(n, r, i);
                return ha(s, i) ? t : us({}, t, (((o = {})[n] = s), o));
              },
              la(n)
            );
          if (oa(n)) {
            var r = aa(t, n, function (t, n, r) {
              return e(t, n, r);
            });
            return ha(r, n) ? la(n) : r;
          }
          return la(n);
        },
        da = function (t, n, e) {
          return pa(t, n, function (t, r, i) {
            return ia(n) && null === r ? void 0 : e(t, r, i);
          });
        },
        va = function (t, n, e) {
          return pa(t, e, function (t, r, i) {
            return void 0 === n[t]
              ? r
              : !ia(e) || (null !== r && null !== n[t])
              ? va(r, n[t], i)
              : void 0;
          });
        },
        ya = function (t, n, e) {
          return sa(e)
            ? t
            : aa(
                ia(e)
                  ? ds(t, function (t, e) {
                      return null !== n[t];
                    })
                  : t,
                e,
                function (t, e, r) {
                  return void 0 === n[t] ? e : ya(e, n[t], r);
                }
              );
        },
        ga = function (t, n, e) {
          return sa(e)
            ? t !== n
              ? t
              : la(e)
            : da(t, e, function (t, e, r) {
                return ga(e, n[t], r);
              });
        },
        _a = function (t, n) {
          if (ia(n)) {
            var e = ds(t, function (t, n) {
                return null === n;
              }),
              r = da(t, n, function (t, n, e) {
                return _a(n, e);
              });
            return us({}, r, e);
          }
          return da(t, n, function (t, n, e) {
            return _a(n, e);
          });
        },
        ma = function (t, n, e) {
          return sa(e)
            ? t
            : ia(e) && void 0 !== t["*"]
            ? aa(n, e, function (n, e, r) {
                return null === e ? null : ma(t["*"], e, r);
              })
            : aa(
                ds(n, function (n) {
                  return void 0 !== t[n];
                }),
                e,
                function (n, e, r) {
                  return ma(t[n], e, r);
                }
              );
        },
        xa = function (t) {
          var n = t.split("").findIndex(function (n, e) {
              return hs(t.substring(0, t.length - e));
            }),
            e =
              -1 === n ? ("-" === t[0] || "+" === t[0] ? 1 : 0) : t.length - n,
            r = t.substring(0, e),
            i = t.substring(e),
            o =
              "" === r && "" === i
                ? "0"
                : "" === r || "+" === r
                ? "1"
                : "-" === r
                ? "-1"
                : r;
          return hs(o)
            ? us({ num: parseFloat(o) }, "" !== i ? { symbol: i } : {})
            : new Error();
        },
        ba = function (t, n, e) {
          var r = e || JSON.stringify(t),
            i = t;
          return (void 0 !== i.m && "number" != typeof i.m) ||
            (void 0 !== i.c && "number" != typeof i.c) ||
            void 0 === i.x
            ? new Error("invalid expression '" + r + "'")
            : n.includes(i.x)
            ? {
                m: void 0 !== i.m ? i.m : 1,
                x: i.x,
                c: void 0 !== i.c ? i.c : 0,
              }
            : new Error(
                "expression '" +
                  r +
                  "' uses invalid variable '" +
                  i.x +
                  "' (valid variables are [" +
                  n +
                  "])"
              );
        },
        wa = function (t) {
          return ls(t);
        },
        ka = function (t, n) {
          return n.type === gs.Number && wa(t);
        },
        Ma = function (t, n) {
          if (!wa(t)) return t;
          var e = void 0 !== t.m ? t.m : 1,
            r = void 0 !== t.c ? t.c : 0;
          return void 0 === t.x
            ? e + r
            : n.hasOwnProperty(t.x)
            ? e * n[t.x] + r
            : t;
        },
        Ea = function (t, n) {
          return n.type === gs.Number && ka(t, n) ? [t.x] : [];
        };
      function Sa(t, n, e) {
        if (e.type === gs.Number && wa(t)) {
          var r = Ea(t, e);
          return Object.keys(n).findIndex(function (t) {
            return r.includes(t);
          }) >= 0
            ? Ma(t, n)
            : void 0;
        }
        return da(t, e, function (t, e, r) {
          return Sa(e, n, r);
        });
      }
      var Aa,
        Oa = function (t, n) {
          return sa(n) && ka(t, n)
            ? t
            : da(t, n, function (t, n, e) {
                return Oa(n, e);
              });
        },
        Na = function (t, n) {
          return sa(n) && !ka(t, n)
            ? t
            : da(t, n, function (t, n, e) {
                return Na(n, e);
              });
        },
        Pa = function (t, n) {
          if (sa(n) && ka(t, n)) {
            var e = Ea(t, n),
              r = n.symbol;
            return void 0 !== r && e.includes(r) ? void 0 : t;
          }
          return da(t, n, function (t, n, e) {
            return Pa(n, e);
          });
        };
      !(function (t) {
        (t.circle = "circle"), (t.rect = "rect"), (t.ellipse = "ellipse");
      })(Aa || (Aa = {}));
      var Ta,
        za = zu(
          {
            entries: us(
              {
                labels: { type: gs.Lookup, entry: Fu, validVars: [Yu.Radius] },
                shape: { type: gs.String, validValues: cs(Aa) },
                color: { type: gs.String },
                size: {
                  type: gs.Record,
                  entries: {
                    width: { type: gs.Number, symbol: Yu.Width },
                    height: { type: gs.Number, symbol: Yu.Height },
                  },
                  keyOrder: ["width", "height"],
                },
                pos: {
                  type: gs.Record,
                  entries: { x: { type: gs.Number }, y: { type: gs.Number } },
                  keyOrder: ["x", "y"],
                },
                fixed: { type: gs.Boolean },
                draggable: { type: gs.Boolean },
                hover: { type: gs.Boolean },
                click: { type: gs.Boolean },
              },
              ju
            ),
            type: gs.Record,
            keyOrder: [
              "labels",
              "shape",
              "color",
              "size",
              "pos",
              "fixed",
              "draggable",
              "hover",
              "click",
            ].concat(qu),
            validVars: [Yu.Width, Yu.Height],
          },
          Cu
        ),
        Ia = us(
          {},
          Iu,
          {
            labels: {},
            shape: "circle",
            color: Rs.darkgray,
            size: { width: 12, height: 12 },
            pos: { x: 0, y: 0 },
            fixed: !1,
            draggable: !0,
            hover: !1,
            click: !1,
          },
          Du
        ),
        Ca = us({}, Lu, { labels: { "*": Wu } }),
        La = function (t, n, e, r) {
          return "rect" === r || "ellipse" === r
            ? (function (t, n, e) {
                var r = Ru(t),
                  i = Math.atan2(e, n);
                return r >= 0 && r < i
                  ? n / Math.cos(r)
                  : r >= i && r < Math.PI - i
                  ? e / Math.cos(r - Math.PI / 2)
                  : r >= Math.PI - i && r < Math.PI + i
                  ? n / Math.cos(r - Math.PI)
                  : r >= Math.PI + i && r < 2 * Math.PI - i
                  ? e / Math.cos(r - (3 * Math.PI) / 2)
                  : n / Math.cos(2 * Math.PI - r);
              })(t, n, e)
            : n;
        },
        ja = function (t, n) {
          var e = fa(t.labels, n.labels),
            r = ds(t.labels, function (t) {
              return "value" !== t;
            }),
            i = ds(e, function (t) {
              return "value" !== t;
            }),
            o = ds(e, function (t) {
              return void 0 === i[t];
            }),
            s = as(i, function (t, n, e) {
              var i = Object.keys(r).length + e,
                o =
                  (3 * Math.PI) / 4 -
                  (Math.PI / 2) * (i % 4) -
                  Math.floor(i / 4) * (Math.PI / 4);
              return us({}, Ku(t), {
                radius: { m: 1, x: Yu.Radius, c: 3 },
                angle: Bu(o),
                align: "radial",
              });
            }),
            u = as(o, function (t) {
              return Ku(t);
            });
          return { labels: us({}, s, u) };
        },
        qa = function (t) {
          var n,
            e,
            r,
            i = t.size.width && void 0 !== t.size.width,
            o = t.size && void 0 !== t.size.height;
          return us(
            {},
            i ? (((n = {})[Yu.Width] = t.size.width), n) : {},
            void 0 !== t.shape && "circle" === t.shape && i
              ? (((e = {})[Yu.Height] = t.size.width), e)
              : o
              ? (((r = {})[Yu.Height] = t.size.height), r)
              : {}
          );
        },
        Da = function (t, n) {
          var e;
          if (
            t.size &&
            void 0 !== t.size.width &&
            void 0 !== t.size.height &&
            void 0 !== n.angle
          ) {
            var r = La(Vu(n.angle), t.size.width, t.size.height, t.shape);
            return ((e = {})[Yu.Radius] = r), e;
          }
          return {};
        },
        Va = function (t, n) {
          var e = Math.floor(Math.sqrt(t)),
            r = Math.pow(e, 2) !== t ? e + 1 : e,
            i = r % 2 == 0 ? r + 1 : r,
            o = Math.floor(i / 2),
            s = Math.pow(i, 2) - t,
            u =
              s <= i
                ? { x: i - s - o, y: -o }
                : s <= 2 * i - 1
                ? { x: -o, y: s - i - o }
                : s <= 3 * i - 2
                ? { x: s - 2 * i - o + 1, y: o }
                : { x: o, y: i - (s - 3 * i + 3) - o };
          return { x: u.x * (n + 1), y: u.y * (n + 1) };
        },
        Ba = function (t, n, e, r) {
          var i = Qs(t),
            o = e.nodes[r],
            s = n.nodes[r];
          if (o.visible) {
            var u = Ks(i, r),
              a = u.attr("_width"),
              c = u.attr("_height"),
              h =
                null !== a && null !== c
                  ? [parseFloat(a), parseFloat(c)]
                  : [s.width / 2, s.height / 2];
            return { shape: o.shape, size: h, pos: [s.x, s.y] };
          }
          return {
            shape: o.shape,
            size: [s.width / 2, s.height / 2],
            pos: [s.x, s.y],
          };
        },
        Ra = function (t, n, e) {
          void 0 === e && (e = 0);
          var r = La(n, t.size[0], t.size[1], t.shape) + e;
          return [t.pos[0] + r * Math.cos(n), t.pos[1] + r * Math.sin(n)];
        },
        Ga = function (t, n, e, r) {
          var i = Ba(t, n, e, r.source),
            o = Ba(t, n, e, r.target),
            s = r.directed ? 5 : 0;
          return {
            angle:
              r.source === r.target
                ? (function (t, n, e, r) {
                    var i = n.adjacentNodes[r].filter(function (t) {
                      return t !== r;
                    });
                    if (0 === i.length) return Math.PI;
                    var o = Ba(t, n, e, r).pos,
                      s = i.map(function (r) {
                        var i = Ba(t, n, e, r).pos;
                        return Ru(Math.atan2(i[1] - o[1], i[0] - o[0]));
                      }),
                      u = s.sort(),
                      a = u.map(function (t, n) {
                        return n === u.length - 1
                          ? 2 * Math.PI - t + u[0]
                          : u[n + 1] - t;
                      }),
                      c = a.reduce(function (t, n, e) {
                        return n > a[t] ? e : t;
                      }, 0);
                    return Ru(s[c] + a[c] / 2 - Math.PI / 2);
                  })(t, n, e, r.source)
                : Ru(Math.atan2(o.pos[1] - i.pos[1], o.pos[0] - i.pos[0])),
            flip: r.flip,
            curve: r.curve,
            path: r.path.map(function (t) {
              return [t.x, t.y];
            }),
            sourceOffset: 0,
            targetOffset: s,
            source: i,
            target: o,
            sourceId: r.source,
            targetId: r.target,
          };
        },
        Xa = function (t) {
          return (
            t.flip &&
            t.sourceId !== t.targetId &&
            t.angle > Math.PI / 2 &&
            t.angle <= (3 * Math.PI) / 2
          );
        },
        Ya = function (t, n, e) {
          var r,
            o = Xa(n)
              ? n.path.map(function (t) {
                  return [t[0], -t[1]];
                })
              : n.path,
            s = 0 === o.length ? e : Xu(Gu(o[0], n.angle), e),
            u = 0 === o.length ? e : Xu(Gu(o[o.length - 1], n.angle), e),
            a = Math.atan2(s[1] - n.source.pos[1], s[0] - n.source.pos[0]),
            c = Math.atan2(u[1] - n.target.pos[1], u[0] - n.target.pos[0]),
            h = Ra(n.source, a, n.sourceOffset),
            l = Ra(n.target, c, n.targetOffset),
            f = Gu(Xu(h, [-e[0], -e[1]]), -n.angle),
            p = Gu(Xu(l, [-e[0], -e[1]]), -n.angle),
            d = ei()
              .x(function (t) {
                return t[0];
              })
              .y(function (t) {
                return -t[1];
              })
              .curve(((r = n.curve), i["curve" + Hs(r)]))([f].concat(o, [p]));
          t.select(".edge-path").attr("d", d);
          var v = t.select(".edge-path-overlay");
          v.empty() || v.attr("d", d);
        },
        Ha = function (t, n, e) {
          Object.keys(n.edges).forEach(function (r) {
            if (n.edges[r].visible) {
              var i = Ga(t, e, n, n.edges[r]),
                o = $s(t, r),
                s = (function (t) {
                  if (t.sourceId === t.targetId)
                    return Ra(t.source, t.angle + Math.PI / 2);
                  var n = Ra(t.source, t.angle),
                    e = Ra(t.target, t.angle + Math.PI);
                  return [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2];
                })(i);
              o.attr(
                "transform",
                "translate(" +
                  s[0] +
                  "," +
                  -s[1] +
                  ")rotate(" +
                  -Bu(i.angle) +
                  ")"
              ),
                ta(o).attr("transform", Xa(i) ? "scale(-1, -1)" : null),
                Ya(o, i, s);
            }
          });
        },
        Fa = function (t, n, e) {
          if (n.visible) {
            var r = Ws(Us(t));
            !(function (t, n, e) {
              Object.entries(e.nodes).forEach(function (e) {
                var r = e[0],
                  i = e[1];
                n[r].visible &&
                  Ks(Qs(t), r).attr(
                    "transform",
                    "translate(" + i.x + "," + -i.y + ")"
                  );
              });
            })(r, n.nodes, e),
              Ha(r, n, e);
          }
        },
        Ua = function (t, n) {
          var e = "circle" === t.shape ? 2 * t.size.width : 2 * t.size.height,
            r =
              n.size &&
              ("circle" === t.shape
                ? void 0 !== n.size.width
                : void 0 !== n.size.height);
          return us(
            {},
            n.size && void 0 !== n.size.width
              ? { width: 2 * t.size.width }
              : {},
            r ? { height: e } : {},
            n.pos && void 0 !== n.pos.x ? { x: t.pos.x } : {},
            n.pos && void 0 !== n.pos.y ? { y: t.pos.y } : {},
            void 0 !== n.fixed ? { fixed: t.fixed ? 1 : 0 } : {}
          );
        },
        Wa = function (t) {
          return Object(rs.d3adaptor)(Vs)
            .nodes([])
            .links([])
            .handleDisconnected(!1)
            .avoidOverlaps(!0)
            .on("tick", t);
        },
        Qa = function (t) {
          return { cola: Wa(t), tick: t, nodes: {}, adjacentNodes: {} };
        },
        Ka = function (t, n, e) {
          var r =
              e.nodes &&
              Object.entries(e.nodes).findIndex(function (t) {
                var e = t[0],
                  r = t[1];
                return (
                  null === r ||
                  (function (t, n) {
                    return !fs(Ua(t, n));
                  })(n.nodes[e], r)
                );
              }) >= 0,
            i =
              e.edges &&
              Object.values(e.edges).findIndex(function (t) {
                return (
                  null === t ||
                  void 0 !== (n = t).source ||
                  void 0 !== n.target ||
                  void 0 !== n.length
                );
                var n;
              }) >= 0,
            o = (function (t) {
              return void 0 !== t.size || void 0 !== t.edgelengths;
            })(e);
          if (!r && !i && !o) return t;
          var s,
            u,
            a,
            c = r
              ? (function (t, n, e) {
                  var r = as(e, function (t, e) {
                    return null === e ? null : Ua(n[t], e);
                  });
                  return Object.keys(t)
                    .concat(Object.keys(e))
                    .reduce(function (n, e) {
                      var i, o, s;
                      return null === r[e]
                        ? n
                        : void 0 === t[e]
                        ? us({}, n, (((i = {})[e] = r[e]), i))
                        : void 0 === r[e]
                        ? us({}, n, (((o = {})[e] = t[e]), o))
                        : us({}, n, (((s = {})[e] = us({}, t[e], r[e])), s));
                    }, {});
                })(t.nodes, n.nodes, e.nodes)
              : t.nodes;
          r &&
            ((s = t.cola),
            (u = c),
            (a = s.nodes()).splice.apply(
              a,
              [0, s.nodes().length].concat(Object.values(u))
            )),
            (i || void 0 !== e.edgelengths) &&
              (function (t, n, e) {
                var r,
                  i = as(e, function (t, e) {
                    return us({}, e, {
                      source: n[e.source],
                      target: n[e.target],
                    });
                  });
                (r = t.links()).splice.apply(
                  r,
                  [0, t.links().length].concat(Object.values(i))
                );
              })(
                t.cola,
                c,
                (function (t) {
                  return as(t, function (t, n) {
                    return {
                      source: (e = n).source,
                      target: e.target,
                      length: e.length,
                    };
                    var e;
                  });
                })(n.edges)
              ),
            o &&
              (function (t, n) {
                t.size([n.size.width, n.size.height]),
                  "individual" === n.edgelengths.type
                    ? t.linkDistance(function (t) {
                        return t.length;
                      })
                    : "jaccard" === n.edgelengths.type
                    ? t.jaccardLinkLengths(n.edgelengths.length, 1)
                    : "symmetric" === n.edgelengths.type &&
                      t.symmetricDiffLinkLengths(n.edgelengths.length, 0.1);
              })(t.cola, n);
          var h =
            void 0 === r && void 0 === i
              ? t.adjacentNodes
              : (function (t, n) {
                  var e = as(t, function (t) {
                    return [];
                  });
                  return Object.values(n).reduce(function (t, n) {
                    var e,
                      r,
                      i = us(
                        {},
                        t,
                        (((e = {})[n.target] = t[n.target].concat([n.source])),
                        e)
                      );
                    return us(
                      {},
                      i,
                      (((r = {})[n.source] = i[n.source].concat([n.target])), r)
                    );
                  }, e);
                })(n.nodes, n.edges);
          return t.cola.start(), us({}, t, { nodes: c, adjacentNodes: h });
        };
      !(function (t) {
        (t.basis = "basis"),
          (t.bundle = "bundle"),
          (t.cardinal = "cardinal"),
          (t["catmull-rom"] = "catmull-rom"),
          (t.linear = "linear"),
          (t["monotone-x"] = "monotone-x"),
          (t["monotone-y"] = "monotone-y"),
          (t.natural = "natural"),
          (t.step = "step"),
          (t["step-before"] = "step-before"),
          (t["step-after"] = "step-after");
      })(Ta || (Ta = {}));
      var $a,
        Ja = zu(
          {
            entries: us(
              {
                labels: { type: gs.Lookup, entry: Fu },
                source: { type: gs.String },
                target: { type: gs.String },
                directed: { type: gs.Boolean },
                length: { type: gs.Number },
                thickness: { type: gs.Number },
                color: { type: gs.String },
                flip: { type: gs.Boolean },
                curve: { type: gs.String, validValues: cs(Ta) },
                path: {
                  type: gs.Array,
                  entry: {
                    type: gs.Record,
                    entries: { x: { type: gs.Number }, y: { type: gs.Number } },
                    keyOrder: ["x", "y"],
                  },
                },
              },
              ju
            ),
            type: gs.Record,
            keyOrder: [
              "labels",
              "source",
              "target",
              "directed",
              "length",
              "thickness",
              "color",
              "flip",
              "curve",
              "path",
            ].concat(qu),
            validVars: [],
          },
          Cu
        ),
        Za = us(
          {},
          Iu,
          {
            labels: {},
            source: "",
            target: "",
            directed: !1,
            length: 70,
            thickness: 2.5,
            color: Rs.lightgray,
            flip: !0,
            curve: "natural",
            path: [],
          },
          Du
        ),
        tc = { align: "radial", rotate: !0, size: 11, radius: 3 },
        nc = us({}, Lu, { labels: { "*": Wu } }),
        ec = function (t, n) {
          return {
            labels: as(fa(t.labels, n.labels), function (e, r, i) {
              var o = n.path ? n.path : t.path,
                s = 0 === o.length ? 0 : o[Math.floor((o.length - 1) / 2)].y,
                u = "number" == typeof s ? s : 0,
                a =
                  (Object.keys(t.labels).length + i) % 2 == 0
                    ? Math.PI / 2
                    : (3 * Math.PI) / 2;
              return us({}, Ku(e), tc, { pos: { x: 0, y: u }, angle: Bu(a) });
            }),
          };
        },
        rc = function (t, n, e) {
          var r,
            i,
            o,
            s = void 0 === t[n] ? {} : t[n],
            u = void 0 === t[e] ? {} : t[e],
            a = us({}, s, (((r = {})[e] = void 0 === s[e] ? 1 : s[e] + 1), r)),
            c = us({}, u, (((i = {})[n] = void 0 === u[n] ? 1 : u[n] + 1), i));
          return us({}, t, (((o = {})[n] = a), (o[e] = c), o));
        },
        ic = function (t, n) {
          var e,
            r = fa(t, n);
          return fs(r)
            ? r
            : Object.entries(r).reduce(
                function (t, n) {
                  var e,
                    r,
                    i = n[0],
                    o = n[1],
                    s = o.source || "",
                    u = o.target || "",
                    a = rc(t.matrix, s, u),
                    c = a[s][u] - 1,
                    h =
                      s === u
                        ? [
                            { x: 8 * -((r = c) + 1), y: 8 },
                            { x: 10 * -(r + 1), y: 14 + 6 * (r + 1) },
                            { x: 0, y: 14 + 14 * (r + 1) },
                            { x: 10 * (r + 1), y: 14 + 6 * (r + 1) },
                            { x: 8 * (r + 1), y: 8 },
                          ]
                        : [
                            {
                              x: 0,
                              y: Math.pow(-1, c + 1) * Math.ceil(c / 2) * 16,
                            },
                          ],
                    l = us({}, Za, { path: h }),
                    f = ca(l, ec(l, o), Ja);
                  return {
                    matrix: a,
                    edges: us({}, t.edges, ((e = {}), (e[i] = f), e)),
                  };
                },
                {
                  matrix:
                    ((e = t),
                    Object.values(e).reduce(function (t, n) {
                      return rc(t, n.source, n.target);
                    }, {})),
                  edges: {},
                }
              ).edges;
        };
      !(function (t) {
        (t.individual = "individual"),
          (t.symmetric = "symmetric"),
          (t.jaccard = "jaccard");
      })($a || ($a = {}));
      var oc,
        sc,
        uc = zu(
          {
            type: gs.Record,
            entries: us(
              {
                nodes: { type: gs.Lookup, entry: za },
                edges: { type: gs.Lookup, entry: Ja },
                labels: { type: gs.Lookup, entry: Fu },
                size: {
                  type: gs.Record,
                  entries: {
                    width: { type: gs.Number, symbol: Yu.CanvasWidth },
                    height: { type: gs.Number, symbol: Yu.CanvasHeight },
                  },
                  keyOrder: ["width", "height"],
                },
                edgelengths: {
                  type: gs.Record,
                  entries: {
                    type: { type: gs.String, validValues: cs($a) },
                    length: { type: gs.Number },
                  },
                  keyOrder: ["type", "length"],
                },
                pan: {
                  type: gs.Record,
                  entries: { x: { type: gs.Number }, y: { type: gs.Number } },
                  keyOrder: ["x", "y"],
                },
                zoom: { type: gs.Number },
                panlimit: {
                  type: gs.Record,
                  entries: {
                    horizontal: { type: gs.Number },
                    vertical: { type: gs.Number },
                  },
                  keyOrder: ["horizontal", "vertical"],
                },
                zoomlimit: {
                  type: gs.Record,
                  entries: {
                    min: { type: gs.Number },
                    max: { type: gs.Number },
                  },
                  keyOrder: ["min", "max"],
                },
                zoomkey: { type: gs.Boolean },
              },
              ju
            ),
            keyOrder: [
              "nodes",
              "edges",
              "labels",
              "size",
              "edgelengths",
              "pan",
              "zoom",
              "panlimit",
              "zoomlimit",
              "zoomkey",
            ].concat(qu),
            validVars: [Yu.CanvasWidth, Yu.CanvasHeight],
          },
          Cu
        ),
        ac = us(
          {},
          Iu,
          {
            nodes: {},
            edges: {},
            labels: {},
            size: { width: 100, height: 100 },
            edgelengths: { type: "jaccard", length: 70 },
            pan: { x: 0, y: 0 },
            zoom: 1,
            panlimit: { horizontal: 1 / 0, vertical: 1 / 0 },
            zoomlimit: { min: 0.1, max: 10 },
            zoomkey: !1,
          },
          Du
        ),
        cc = {
          align: "middle",
          pos: { x: 0, y: { m: 0.5, x: Yu.CanvasHeight, c: 0 } },
          rotate: !0,
          color: Rs.gray,
          size: 20,
        },
        hc = us({}, Lu, {
          nodes: { "*": Ca },
          edges: { "*": nc },
          labels: { "*": Wu },
          size: { width: { duration: 0 }, height: { duration: 0 } },
        }),
        lc = function (t, n) {
          var e = as(fa(t.nodes, n.nodes), function (n, e, r) {
              var i,
                o,
                s,
                u,
                a =
                  ((i = n),
                  (o = Object.keys(t.nodes).length + r),
                  (u = us({}, Ku(i), {
                    align: "middle",
                    pos: { x: 0, y: -1 },
                    radius: 0,
                    angle: 90,
                    rotate: !1,
                    color: Rs.white,
                    size: 12,
                  })),
                  us({}, Ia, {
                    labels: ((s = {}), (s.value = u), s),
                    pos: Va(o, 2 * Ia.size.width),
                  }));
              return ca(a, ja(a, e), za);
            }),
            r = ic(t.edges, n.edges),
            i = as(fa(t.labels, n.labels), function (t) {
              return us({}, Ku(t), cc);
            }),
            o = da(n.nodes || {}, uc.entries.nodes, function (n, e) {
              return t.nodes[n] ? ja(t.nodes[n], e) : {};
            }),
            s = da(n.edges || {}, uc.entries.edges, function (n, e) {
              return t.edges[n] ? ec(t.edges[n], e) : {};
            });
          return {
            nodes: us({}, o, e),
            edges: us({}, s, r),
            labels: us({}, n.labels, i),
          };
        },
        fc = function (t, n, e) {
          var r = Sa(n, pc(t), uc),
            i = ca(t, r, uc),
            o = ca(e, r, uc),
            s = da(o.nodes || {}, uc.entries.nodes, function (t, e) {
              return i.nodes && i.nodes[t] && n.nodes && n.nodes[t]
                ? (function (t, n, e) {
                    var r = Sa(n, qa(t), za),
                      i = ca(t, r || {}, za);
                    return ca(
                      r || {},
                      {
                        labels:
                          da(n.labels || {}, za.entries.labels, function (
                            t,
                            n
                          ) {
                            return i.labels && i.labels[t]
                              ? Sa(n, Da(i, i.labels[t]), Fu)
                              : void 0;
                          }) || {},
                      },
                      za
                    );
                  })(i.nodes[t], n.nodes[t])
                : void 0;
            });
          return ca(r, { nodes: s || {} }, uc);
        },
        pc = function (t) {
          var n, e;
          return us(
            {},
            t.size && void 0 !== t.size.width
              ? (((n = {})[Yu.CanvasWidth] = t.size.width / 2), n)
              : {},
            t.size && void 0 !== t.size.height
              ? (((e = {})[Yu.CanvasHeight] = t.size.height / 2), e)
              : {}
          );
        },
        dc = function (t, n, e) {
          var r,
            i =
              n ||
              ((r = (function (t) {
                var n = Fs(t),
                  e = [
                    n.node().getBoundingClientRect().width,
                    n.node().getBoundingClientRect().height,
                  ];
                return 0 !== e[0] && 0 !== e[1] ? e : [100, 100];
              })(t)),
              us({}, ac, { size: { width: r[0], height: r[1] } })),
            o = lc(i, e),
            s = void 0 === n ? ca(i, e, uc) : e;
          return ca(o, s, uc);
        },
        vc = function (t, n, e) {
          var r = ca(t || {}, Na(e, uc), uc),
            i = Oa(e, uc),
            o = fc(r, i, e),
            s = ca(r, o, uc),
            u = fc(s, n || {}, e),
            a = ga(u, t || {}, uc),
            c = ca(e, o, uc);
          return ca(a, c, uc);
        };
      !(function (t) {
        (t.normal = "normal"), (t.traverse = "traverse");
      })(oc || (oc = {})),
        (function (t) {
          (t.linear = "linear"),
            (t.poly = "poly"),
            (t["poly-in"] = "poly-in"),
            (t["poly-out"] = "poly-out"),
            (t["poly-in-out"] = "poly-in-out"),
            (t.quad = "quad"),
            (t["quad-in"] = "quad-in"),
            (t["quad-out"] = "quad-out"),
            (t["quad-in-out"] = "quad-in-out"),
            (t.cubic = "cubic"),
            (t["cubic-in"] = "cubic-in"),
            (t["cubic-out"] = "cubic-out"),
            (t["cubic-in-out"] = "cubic-in-out"),
            (t.sin = "sin"),
            (t["sin-in"] = "sin-in"),
            (t["sin-out"] = "sin-out"),
            (t["sin-in-out"] = "sin-in-out"),
            (t.exp = "exp"),
            (t["exp-in"] = "exp-in"),
            (t["exp-out"] = "exp-out"),
            (t["exp-in-out"] = "exp-in-out"),
            (t.circle = "circle"),
            (t["circle-in"] = "Circle-out"),
            (t["circle-out"] = "circle-out"),
            (t["circle-in-out"] = "circle-in-out"),
            (t.elastic = "elastic"),
            (t["elastic-in"] = "elastic-in"),
            (t["elastic-out"] = "elastic-out"),
            (t["elastic-in-out"] = "elastic-in-out"),
            (t.back = "back"),
            (t["back-in"] = "back-in"),
            (t["back-out"] = "back-out"),
            (t["back-in-out"] = "back-in-out"),
            (t.bounce = "bounce"),
            (t["bounce-in"] = "bounce-in"),
            (t["bounce-out"] = "bounce-out"),
            (t["bounce-in-out"] = "bounce-in-out");
        })(sc || (sc = {}));
      var yc = {
          type: gs.Record,
          entries: {
            type: { type: gs.String, validValues: cs(oc) },
            duration: { type: gs.Number },
            ease: { type: gs.String, validValues: cs(sc) },
            linger: { type: gs.Number },
            data: {
              type: gs.Record,
              entries: { source: { type: gs.String } },
              keyOrder: ["source"],
            },
          },
          keyOrder: ["type", "duration", "ease", "linger"],
        },
        gc = {
          type: "normal",
          duration: 0.5,
          ease: "poly",
          linger: 0.5,
          data: {},
        },
        _c = function (t, n) {
          if (ia(t)) return { type: gs.Lookup, entry: _c(t.entry, n) };
          if (oa(t)) return { type: gs.Array, entry: _c(t.entry, n) };
          if (ra(t)) {
            var e = t.entries;
            return {
              type: gs.Record,
              entries: as(e, function (t, e) {
                return _c(e, n);
              }),
              keyOrder: Object.keys(e),
            };
          }
          return n;
        },
        mc = _c(uc, yc),
        xc = function (t, n, e, r) {
          return (
            void 0 === r && (r = {}),
            sa(e)
              ? null !== t
                ? t
                : r
              : da(n, e, function (n, e, i) {
                  var o = null !== t && void 0 !== t[n] ? t[n] : null,
                    s =
                      null !== t && void 0 !== t["**"] ? ca(r, t["**"], yc) : r;
                  return xc(o, e, i, s);
                })
          );
        },
        bc = function (t, n, e) {
          return sa(e)
            ? n
            : pa(n, e, function (n, r, i) {
                var o = t ? t[n] : void 0;
                return void 0 === o
                  ? void 0
                  : ia(e) && null === r
                  ? o
                  : bc(o, r, i);
              });
        },
        wc = function (t, n, e, r) {
          var i = ca(r, bc(n, e, uc), uc),
            o = xc(t, i, uc),
            s = xc({ "**": gc }, i, uc),
            u = ca(s, ma(hc, s, mc), mc);
          return ca(u, o, mc);
        },
        kc = function (t) {
          return t.reduce(function (n, e, r) {
            var i = e[0];
            e[1];
            return r > 0
              ? n + (t[r - 1][1] === gs.Array ? "" + [i] : "." + i)
              : i;
          }, "");
        },
        Mc = function (t, n, e) {
          var r = e || { variables: [], path: [["canvas", gs.Record]] },
            i = us({}, r, { variables: r.variables.concat(n.validVars || []) });
          return sa(n)
            ? Ec(t, n, i)
            : ra(n)
            ? Sc(t, n, i)
            : ia(n)
            ? Oc(t, n, i)
            : oa(n)
            ? Nc(t, n, i)
            : new Error();
        },
        Ec = function (t, n, e) {
          if (n.validValues && !n.validValues.includes(t))
            return new Error(
              "attribute '" +
                kc(e.path) +
                "' has invalid value '" +
                t +
                "' (valid values are [" +
                n.validValues +
                "])"
            );
          switch (n.type) {
            case gs.Number:
              return "number" == typeof t
                ? t
                : "string" == typeof t
                ? (function (t, n) {
                    var e = "invalid expression '" + t + "'",
                      r = t.replace(/\s/g, ""),
                      i =
                        r.lastIndexOf("+") > 0
                          ? r.lastIndexOf("+")
                          : r.lastIndexOf("-") > 0
                          ? r.lastIndexOf("-")
                          : r.length,
                      o = xa(r.substring(0, i)),
                      s = xa(r.substring(i));
                    if (o instanceof Error) return new Error(e);
                    if (s instanceof Error) return new Error(e);
                    if (void 0 !== o.symbol && void 0 !== s.symbol)
                      return new Error(e + ": too many variables");
                    var u =
                      void 0 !== o.symbol
                        ? { m: o.num, x: o.symbol, c: s.num }
                        : { m: s.num, x: s.symbol, c: o.num };
                    return ba(u, n, t);
                  })(t, e.variables)
                : ls(t)
                ? ba(t, e.variables)
                : new Error("attribute '" + kc(e.path) + "' must be a number");
            case gs.String:
              return "string" == typeof t
                ? t
                : "number" == typeof t
                ? String(t)
                : new Error("attribute '" + kc(e.path) + "' must be a string");
            case gs.Boolean:
              return "boolean" == typeof t
                ? t
                : new Error("attribute '" + kc(e.path) + "' must be a boolean");
            default:
              return new Error();
          }
        },
        Sc = function (t, n, e) {
          if (Array.isArray(t) && t.length > n.keyOrder.length)
            return new Error(
              "attribute '" +
                kc(e.path) +
                "' has too many entries to match [" +
                n.keyOrder +
                "]"
            );
          var r = Ac(t, n.keyOrder),
            i = Object.keys(r).filter(function (t) {
              return !n.entries.hasOwnProperty(t);
            });
          return i.length > 0
            ? new Error(
                "attribute '" +
                  kc(e.path) +
                  "' has unknown entry '" +
                  i[0] +
                  "'"
              )
            : ps(
                n.keyOrder.reduce(function (t, i) {
                  var o,
                    s = n.entries[i];
                  if (r.hasOwnProperty(i)) {
                    var u = us({}, e, { path: e.path.concat([[i, s.type]]) });
                    return us({}, t, (((o = {})[i] = Mc(r[i], s, u)), o));
                  }
                  return t;
                }, {})
              );
        },
        Ac = function (t, n) {
          var e;
          return Array.isArray(t)
            ? t.reduce(function (t, e, r) {
                var i;
                return us({}, t, (((i = {})[n[r]] = e), i));
              }, {})
            : ls(t)
            ? t
            : (((e = {})[n[0]] = t), e);
        },
        Oc = function (t, n, e) {
          return ls(t)
            ? ps(
                aa(t, n, function (t, n, r) {
                  var i = us({}, e, { path: e.path.concat([[t, r.type]]) });
                  return null === n ? n : Mc(n, r, i);
                })
              )
            : new Error("attribute '" + kc(e.path) + "' must be a dictionary");
        },
        Nc = function (t, n, e) {
          return Array.isArray(t)
            ? ps(
                aa(t, n, function (t, n, r) {
                  var i = us({}, e, {
                    path: e.path.concat([[String(t), r.type]]),
                  });
                  return Mc(n, r, i);
                })
              )
            : new Error("attribute '" + kc(e.path) + "' must be an array");
        },
        Pc = function (t, n, e, r) {
          var i = Mc(r.attributes, uc);
          if (i instanceof Error) return i;
          var o = i,
            s = dc(t, n, o),
            u = vc(n, e, s),
            a = ca(
              u,
              (function (t, n) {
                var e = t ? t.edges : {},
                  r = fa(e, n.edges || {}),
                  i = t ? t.nodes : {},
                  o = n.nodes || {};
                return {
                  edges: Object.entries(e)
                    .concat(Object.entries(r))
                    .reduce(function (t, n) {
                      var e,
                        r,
                        s = n[0],
                        u = n[1];
                      return null === o[u.source] ||
                        (!i[u.source] && !o[u.source])
                        ? us({}, t, (((e = {})[s] = null), e))
                        : null === o[u.target] || (!i[u.target] && !o[u.target])
                        ? us({}, t, (((r = {})[s] = null), r))
                        : t;
                    }, {}),
                };
              })(n, u),
              uc
            ),
            c = void 0 === n ? a : ca(n, a, uc),
            h = _a(a, uc),
            l = ya(c, h, uc),
            f = Pa(s, uc),
            p = ca(va(e || {}, s, uc), f, uc),
            d = wc(r.animation, n, a, o),
            v = Mc(d, mc);
          return v instanceof Error
            ? v
            : { attributes: l, changes: a, expressions: p, animation: d };
        },
        Tc = function (t) {
          return {
            name: "canvas",
            attr: t.attributes,
            animation: t.animation,
            changes: t.changes,
          };
        },
        zc = function (t) {
          var n = za.keyOrder.filter(function (t) {
            return "pos" !== t && "visible" !== t && "labels" !== t;
          });
          return nu(tu(t, "shape")) ? eu(t, n) : t;
        },
        Ic = function (t, n) {
          var e = zc(n);
          lu(t, tu(e, "shape"), function (n, e) {
            return (function (t, n) {
              t.select(".shape").remove();
              var e = t.insert(n, ":first-child").classed("shape", !0);
              return "rect" === n && e.attr("rx", 4).attr("ry", 4), e;
            })(t, e);
          });
          var r = t.select(".shape"),
            i = Ys(t, ".node-labels", function (t) {
              return t.append("g").classed("node-labels", !0);
            });
          Su(
            function (t) {
              return (
                (n = i),
                (e = Xs(t)),
                Ys(n, "#label-" + e, function (t) {
                  return t.append("g").attr("id", "label-" + e);
                })
              );
              var n, e;
            },
            tu(e, "labels"),
            Zu
          ),
            xu(
              r,
              "fill",
              function (t) {
                return Gs(t);
              },
              tu(e, "color")
            ),
            (function (t, n, e) {
              var r = tu(n, "width"),
                i = tu(n, "height");
              switch (e) {
                case "circle":
                  xu(
                    t,
                    "r",
                    function (t) {
                      return t;
                    },
                    r
                  );
                  break;
                case "rect":
                  xu(
                    t,
                    "width",
                    function (t) {
                      return 2 * t;
                    },
                    r
                  ),
                    xu(
                      t,
                      "height",
                      function (t) {
                        return 2 * t;
                      },
                      i
                    ),
                    xu(
                      t,
                      "x",
                      function (t) {
                        return -t;
                      },
                      us({}, r, { name: r.name + "-pos" })
                    ),
                    xu(
                      t,
                      "y",
                      function (t) {
                        return -t;
                      },
                      us({}, i, { name: i.name + "-pos" })
                    );
                  break;
                case "ellipse":
                  xu(
                    t,
                    "rx",
                    function (t) {
                      return t;
                    },
                    r
                  ),
                    xu(
                      t,
                      "ry",
                      function (t) {
                        return t;
                      },
                      i
                    );
              }
            })(r, tu(e, "size"), tu(e, "shape").attr),
            bu(r, e);
        },
        Cc = function (t, n) {
          xu(
            t,
            "width",
            function (t) {
              return t;
            },
            tu(tu(n, "size"), "width")
          ),
            xu(
              t,
              "height",
              function (t) {
                return t;
              },
              tu(tu(n, "size"), "height")
            ),
            navigator &&
              void 0 !== navigator.userAgent &&
              /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
              Ys(t, "rect", function (t) {
                return t
                  .append("rect")
                  .classed("safari-fix", !0)
                  .attr("width", "100%")
                  .attr("height", "100%")
                  .attr("fill", "none");
              });
          var e = Ws(t),
            r = (function (t) {
              return Ys(t, ".labels", function (t) {
                return t.append("g").classed("labels", !0);
              });
            })(e),
            i = (function (t) {
              return Ys(t, ".edges", function (t) {
                return t.append("g").classed("edges", !0);
              });
            })(e),
            o = Qs(e);
          Su(
            function (t) {
              return Ks(o, t);
            },
            tu(n, "nodes"),
            Ic
          ),
            Su(
              function (t) {
                return $s(i, t);
              },
              tu(n, "edges"),
              na
            ),
            Su(
              function (t) {
                return (
                  (n = r),
                  (e = Xs(t)),
                  Ys(n, "#label-" + e, function (t) {
                    return t.append("g").attr("id", "label-" + e);
                  })
                );
                var n, e;
              },
              tu(n, "labels"),
              Zu
            );
          var s = nu(tu(n, "size")) ? eu(n, ["svgattr"]) : n;
          bu(t, s);
        };
      function Lc(t, n) {
        Eu(
          function () {
            return Us(t);
          },
          n,
          Cc
        );
      }
      var jc = function (t, n, e) {
          if (
            nu(tu(n, "zoomlimit")) ||
            nu(tu(n, "panlimit")) ||
            nu(tu(n, "zoomkey")) ||
            void 0 === e
          ) {
            var r = n.attr.panlimit.horizontal,
              i = n.attr.panlimit.vertical,
              o = n.attr.zoomkey,
              s = es()
                .translateExtent([
                  [-r, -i],
                  [r, i],
                ])
                .scaleExtent([n.attr.zoomlimit.min, n.attr.zoomlimit.max])
                .on("zoom", function () {
                  Ws(t).attr("transform", V ? V.transform : "");
                })
                .filter(function () {
                  return (
                    (t = o),
                    !V || "wheel" !== V.type || !t || V.ctrlKey || V.metaKey
                  );
                  var t;
                });
            return t.call(s), s;
          }
          return e;
        },
        qc = function (t, n, e) {
          return (function (t, n, e) {
            var r = jc(t, n, e ? e.zoom : void 0);
            return us({}, e, { zoom: r });
          })(Us(t), n, e);
        },
        Dc = function (t, n, e) {
          !(function (t, n, e) {
            var r = Zs({
              pos: Js(tu(n, "pan")),
              scale: tu(n, "zoom"),
              size: Js(tu(n, "size")),
            });
            lu(t, r, function (t, n) {
              var r = [
                  n.size.width / 2 - n.pos.x * n.scale,
                  n.size.height / 2 + n.pos.y * n.scale,
                ],
                i = Uo.translate(r[0], r[1]).scale(n.scale);
              return t.call(e.zoom.transform, i);
            });
          })(Us(t), n, e);
        },
        Vc = !1,
        Bc = !1,
        Rc = function (t, n, e) {
          var r = Us(t),
            i = Qs(Ws(r));
          mu(tu(n, "nodes"), function (t, n) {
            var o = Ks(i, t),
              s = zc(Mu(n));
            hu(o, tu(s, "hover"), function (n, i) {
              var o = i.attr
                ? function (n) {
                    return e(t, n);
                  }
                : function () {};
              !(function (t, n, e) {
                n.on("mouseover", function () {
                  (Bc = !0), Vc || (t.style("cursor", "pointer"), e(!0));
                }),
                  n.on("mouseout", function () {
                    (Bc = !1), Vc || (t.style("cursor", null), e(!1));
                  });
              })(r, n, o);
            });
          });
        },
        Gc = function (t, n, e) {
          var r = Qs(Ws(Us(t)));
          mu(tu(n, "nodes"), function (t, n) {
            var i = Ks(r, t),
              o = zc(Mu(n));
            hu(i, tu(o, "click"), function (n, r) {
              !(function (t, n) {
                t.on("click", function () {
                  V.defaultPrevented || n();
                });
              })(
                n,
                r.attr
                  ? function () {
                      return e(t);
                    }
                  : function () {}
              );
            });
          });
        },
        Xc = function (t, n, e) {
          var r = Us(t),
            i = Qs(Ws(r));
          mu(tu(n, "nodes"), function (t, n) {
            var o = Ks(i, t);
            tu(n, "draggable").attr
              ? (function (t, n, e, r) {
                  n.call(
                    Er()
                      .subject(function () {
                        var t = rs.Layout.dragOrigin(r);
                        return us({}, t, { y: -t.y });
                      })
                      .on("start", function () {
                        (Vc = !0),
                          t.style("cursor", "pointer"),
                          rs.Layout.dragStart(r);
                      })
                      .on("drag", function () {
                        rs.Layout.drag(r, { x: V.x, y: -V.y }), e.resume();
                      })
                      .on("end", function () {
                        (Vc = !1),
                          Bc || t.style("cursor", null),
                          rs.Layout.dragEnd(r);
                      })
                  );
                })(r, o, e.cola, e.nodes[t])
              : (function (t) {
                  t.on(".drag", void 0);
                })(o);
          });
        },
        Yc = function (t, n) {
          return { type: os.error, data: { message: t, type: n } };
        },
        Hc = function (t, n) {
          var e = t.state;
          if (void 0 === e.attributes) return e;
          var r,
            i,
            o,
            s,
            u,
            a =
              ((r = e.attributes),
              (i = n.data),
              (o = { visible: !1 }),
              (s = wc(i.animation, r, o, o)),
              (u = Mc(s, mc)) instanceof Error
                ? u
                : {
                    attributes: us({}, r, o),
                    changes: o,
                    expressions: {},
                    animation: s,
                  });
          if (a instanceof Error)
            return t.listener(Yc(a.message, ss.attribute)), e;
          var c,
            h = Tc(a);
          return (
            Lc(e.canvas, h),
            us({}, e, {
              expressions: void 0,
              attributes: void 0,
              layout:
                ((c = e.layout),
                c.cola
                  .links([])
                  .nodes([])
                  .stop()
                  .on("tick", function () {}),
                Qa(c.tick)),
              renderBehavior: void 0,
            })
          );
        },
        Fc = function (t, n, e, r) {
          Lc(t, n),
            !1 !== n.attr.visible &&
              (Xc(t, n, r),
              (function (t, n, e) {
                var r = Us(t),
                  i = Qs(Ws(r));
                mu(tu(n, "nodes"), function (t, n) {
                  var r = zc(Mu(n)),
                    o = Ks(i, t),
                    s = tu(tu(r, "size"), "width"),
                    u =
                      "circle" === tu(r, "shape").attr
                        ? us({}, s, { name: "height" })
                        : tu(tu(r, "size"), "height");
                  lu(o, s, function (t, n) {
                    return Bs(t)
                      ? t.attr("_width", n).tween(name, function () {
                          return function () {
                            e();
                          };
                        })
                      : t.attr("_width", n);
                  }),
                    lu(o, u, function (t, n) {
                      return Bs(t)
                        ? t.attr("_height", n).tween(name, function () {
                            return function () {
                              e();
                            };
                          })
                        : t.attr("_height", n);
                    });
                });
              })(t, n, e),
              Fa(t, n.attr, r));
        },
        Uc = function (t, n, e) {
          if (!1 === n.attr.visible) return e;
          var r = qc(t, n, e);
          return Dc(t, n, r), r;
        },
        Wc = function (t, n) {
          var e = t.state;
          if (null === n.data.attributes) return Hc(t, n);
          var r = Pc(e.canvas, e.attributes, e.expressions, n.data);
          if (r instanceof Error)
            return t.listener(Yc(r.message, ss.attribute)), e;
          var i = Mu(Tc(r)),
            o = Ka(e.layout, r.attributes, r.changes);
          Fc(e.canvas, i, t.tick, o);
          var s = Uc(e.canvas, i, e.renderBehavior);
          if (r.attributes.visible) {
            Gc(e.canvas, i, function (n) {
              return t.listener(((e = n), { type: os.click, data: { id: e } }));
              var e;
            }),
              Rc(e.canvas, i, function (n, e) {
                return t.listener(
                  ((r = n),
                  (i = e),
                  { type: os.hover, data: { id: r, entered: i } })
                );
                var r, i;
              });
          }
          return us({}, e, {
            expressions: r.expressions,
            attributes: r.attributes,
            layout: o,
            renderBehavior: s,
          });
        },
        Qc = function (t, n) {
          var e = t.state,
            r = (function (t, n, e) {
              var r = Mc(e.attributes, uc);
              if (r instanceof Error) return r;
              var i = vc(t, n, r),
                o = wc(e.animation || {}, t, i, i),
                s = Mc(o, mc);
              return s instanceof Error ? s : { animation: o, changes: i };
            })(e.attributes, e.expressions, n.data);
          if (r instanceof Error) t.listener(Yc(r.message, ss.attribute));
          else {
            var i = {
                name: "canvas",
                attr: e.attributes,
                animation: r.animation,
                highlight: r.changes,
              },
              o = Mu(i);
            Fc(e.canvas, o, t.tick, e.layout),
              Uc(e.canvas, o, e.renderBehavior);
          }
        },
        Kc = function (t) {
          var n,
            e =
              ((n = function () {
                return e;
              }),
              {
                state: void 0,
                listener: void 0,
                setState: function (t) {
                  n().state = t;
                },
                onReceive: function (t) {
                  n().listener = t;
                },
                dispatch: function (t) {
                  var e = (function (t, n, e) {
                    if (null === n)
                      return {
                        state: t,
                        execute: function () {
                          return t.callback(e, n);
                        },
                      };
                    var r = Cs(t, n),
                      i = Ls(t, n, { events: r.events.concat([e]) });
                    return 0 === r.events.length
                      ? js(i, n)
                      : { state: i, execute: function () {} };
                  })(n().state.scheduler, t.queue, t);
                  n().setState(us({}, n().state, { scheduler: e.state })),
                    e.execute();
                },
                receiveEvent: function (t, e) {
                  var r = n().state.scheduler,
                    i = Ds(r, e, t, n().executeEvent);
                  n().setState(us({}, n().state, { scheduler: i.state })),
                    i.execute();
                },
                executeEvent: function (t) {
                  var e = (function (t, n) {
                    return n.type === is.broadcast
                      ? (t.listener({
                          type: os.broadcast,
                          data: { message: n.data.message },
                        }),
                        t.state)
                      : n.type === is.update
                      ? Wc(t, n)
                      : n.type === is.highlight
                      ? (Qc(t, n), t.state)
                      : t.state;
                  })(
                    {
                      state: n().state,
                      listener: n().listener,
                      tick: n().tick,
                    },
                    t
                  );
                  n().setState(e), n().tick();
                },
                tick: function () {
                  var e = n().state;
                  void 0 !== e &&
                    void 0 !== e.attributes &&
                    Fa(t, e.attributes, e.layout);
                },
              });
          return (
            e.setState(
              (function (t, n, e) {
                return {
                  canvas: t,
                  scheduler:
                    ((r = n), { callback: r, queues: {}, stopped: !1 }),
                  expressions: void 0,
                  attributes: void 0,
                  layout: Qa(e),
                  renderBehavior: void 0,
                };
                var r;
              })(t, e.receiveEvent, e.tick)
            ),
            e
          );
        },
        $c = function (t, n) {
          return {
            dispatch: function (n) {
              t.realClient.dispatch(n);
            },
            subscribe: function (n) {
              t.subscriptions.push(n),
                t.realClient.onReceive(function (n) {
                  t.subscriptions.forEach(function (t) {
                    return t(n);
                  });
                });
            },
            canvas: function () {
              return Is(t.realCanvas, n());
            },
          };
        },
        Jc = function (t) {
          return (
            (e = { realClient: Kc((n = t)), realCanvas: n, subscriptions: [] }),
            vs($c, e)
          );
          var n, e;
        },
        Zc = function (t) {
          return Jc(t).canvas();
        };
    },
  ]);
});
//# sourceMappingURL=index.js.map
