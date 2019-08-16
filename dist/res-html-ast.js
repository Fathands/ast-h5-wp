{
  "type": 1,
  "tag": "div",
  "attrsList": [
    {
      "name": "id",
      "value": "base-info"
    }
  ],
  "attrsMap": {
    "id": "base-info",
    "v-bind:style": "pdv.backgroundImage(backgrounImage)"
  },
  "rawAttrsMap": {},
  "children": [
    {
      "type": 1,
      "tag": "img",
      "attrsList": [
        {
          "name": "src",
          "value": "../../../assets/imgs/order/back.png"
        },
        {
          "name": "@click",
          "value": "goBack"
        }
      ],
      "attrsMap": {
        "class": "back-icon",
        "src": "../../../assets/imgs/order/back.png",
        "@click": "goBack"
      },
      "rawAttrsMap": {},
      "parent": "~",
      "children": [],
      "plain": false,
      "staticClass": "\"back-icon\"",
      "attrs": [
        {
          "name": "src",
          "value": "\"../../../assets/imgs/order/back.png\""
        }
      ],
      "hasBindings": true,
      "events": {
        "click": {
          "value": "goBack",
          "dynamic": false
        }
      },
      "static": false,
      "staticRoot": false
    },
    {
      "type": 1,
      "tag": "div",
      "attrsList": [],
      "attrsMap": {
        "class": "goods-info"
      },
      "rawAttrsMap": {},
      "parent": "~",
      "children": [
        {
          "type": 3,
          "text": "商品名称",
          "isComment": true,
          "static": true
        },
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {
            "class": "product-name"
          },
          "rawAttrsMap": {},
          "parent": "~children~1",
          "children": [
            {
              "type": 2,
              "expression": "_s(product.country)+\" \"+_s(product.visa_type)+\"·\"+_s(product.product_name)",
              "tokens": [
                {
                  "@binding": "product.country"
                },
                " ",
                {
                  "@binding": "product.visa_type"
                },
                "·",
                {
                  "@binding": "product.product_name"
                }
              ],
              "text": "{{product.country}} {{product.visa_type}}·{{product.product_name}}",
              "static": false
            }
          ],
          "plain": false,
          "staticClass": "\"product-name\"",
          "static": false,
          "staticRoot": false
        },
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {
            "class": "tags-box"
          },
          "rawAttrsMap": {},
          "parent": "~children~1",
          "children": [
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "tag-item",
                "v-for": "(item, index) in product.tag",
                ":key": "index"
              },
              "rawAttrsMap": {},
              "parent": "~children~1~children~2",
              "children": [
                {
                  "type": 2,
                  "expression": "_s(item)",
                  "tokens": [
                    {
                      "@binding": "item"
                    }
                  ],
                  "text": "{{item}}",
                  "static": false
                }
              ],
              "for": "product.tag",
              "alias": "item",
              "iterator1": "index",
              "key": "index",
              "plain": false,
              "staticClass": "\"tag-item\"",
              "static": false,
              "staticRoot": false,
              "forProcessed": true
            }
          ],
          "plain": false,
          "staticClass": "\"tags-box\"",
          "static": false,
          "staticRoot": false
        },
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {
            "class": "features"
          },
          "rawAttrsMap": {},
          "parent": "~children~1",
          "children": [
            {
              "type": 3,
              "text": " 信息项 ",
              "isComment": true,
              "static": true
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "feature-item",
                "v-for": "item in product.common_info",
                ":key": "item.title"
              },
              "rawAttrsMap": {},
              "parent": "~children~1~children~3",
              "children": [
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [
                    {
                      "name": "v-text",
                      "value": "item.title"
                    }
                  ],
                  "attrsMap": {
                    "class": "item-title",
                    "v-text": "item.title"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~3~children~1",
                  "children": [],
                  "plain": false,
                  "staticClass": "\"item-title\"",
                  "hasBindings": true,
                  "directives": [
                    {
                      "name": "text",
                      "rawName": "v-text",
                      "value": "item.title",
                      "arg": null,
                      "isDynamicArg": false
                    }
                  ],
                  "static": false,
                  "staticRoot": false,
                  "props": [
                    {
                      "name": "textContent",
                      "value": "_s(item.title)"
                    }
                  ]
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {},
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~3~children~1",
                  "children": [
                    {
                      "type": 1,
                      "tag": "template",
                      "attrsList": [],
                      "attrsMap": {
                        "v-if": "item.type === 0"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~3~children~1~children~1",
                      "children": [
                        {
                          "type": 1,
                          "tag": "span",
                          "attrsList": [
                            {
                              "name": "v-text",
                              "value": "item.num"
                            }
                          ],
                          "attrsMap": {
                            "v-text": "item.num"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~3~children~1~children~1~children~0",
                          "children": [],
                          "plain": false,
                          "hasBindings": true,
                          "directives": [
                            {
                              "name": "text",
                              "rawName": "v-text",
                              "value": "item.num",
                              "arg": null,
                              "isDynamicArg": false
                            }
                          ],
                          "static": false,
                          "staticRoot": false,
                          "props": [
                            {
                              "name": "textContent",
                              "value": "_s(item.num)"
                            }
                          ]
                        },
                        {
                          "type": 1,
                          "tag": "span",
                          "attrsList": [
                            {
                              "name": "v-text",
                              "value": "item.unit"
                            }
                          ],
                          "attrsMap": {
                            "v-text": "item.unit"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~3~children~1~children~1~children~0",
                          "children": [],
                          "plain": false,
                          "hasBindings": true,
                          "directives": [
                            {
                              "name": "text",
                              "rawName": "v-text",
                              "value": "item.unit",
                              "arg": null,
                              "isDynamicArg": false
                            }
                          ],
                          "static": false,
                          "staticRoot": false,
                          "props": [
                            {
                              "name": "textContent",
                              "value": "_s(item.unit)"
                            }
                          ]
                        }
                      ],
                      "if": "item.type === 0",
                      "ifConditions": [
                        {
                          "exp": "item.type === 0",
                          "block": "~children~1~children~3~children~1~children~1~children~0"
                        },
                        {
                          "block": {
                            "type": 1,
                            "tag": "span",
                            "attrsList": [
                              {
                                "name": "v-text",
                                "value": "item.unit"
                              }
                            ],
                            "attrsMap": {
                              "v-else": "",
                              "v-text": "item.unit"
                            },
                            "rawAttrsMap": {},
                            "parent": "~children~1~children~3~children~1~children~1",
                            "children": [],
                            "else": true,
                            "plain": false,
                            "hasBindings": true,
                            "directives": [
                              {
                                "name": "text",
                                "rawName": "v-text",
                                "value": "item.unit",
                                "arg": null,
                                "isDynamicArg": false
                              }
                            ],
                            "static": false,
                            "staticRoot": false,
                            "props": [
                              {
                                "name": "textContent",
                                "value": "_s(item.unit)"
                              }
                            ]
                          }
                        }
                      ],
                      "plain": true,
                      "static": false,
                      "staticRoot": false,
                      "ifProcessed": true
                    }
                  ],
                  "plain": true,
                  "static": false,
                  "staticRoot": false
                }
              ],
              "for": "product.common_info",
              "alias": "item",
              "key": "item.title",
              "plain": false,
              "staticClass": "\"feature-item\"",
              "static": false,
              "staticRoot": false,
              "forProcessed": true
            }
          ],
          "plain": false,
          "staticClass": "\"features\"",
          "static": false,
          "staticRoot": false
        },
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {
            "class": "info-card"
          },
          "rawAttrsMap": {},
          "parent": "~children~1",
          "children": [
            {
              "type": 1,
              "tag": "div",
              "attrsList": [
                {
                  "name": "@click",
                  "value": "openDialog('needDays', true)"
                }
              ],
              "attrsMap": {
                "class": "card-title",
                "@click": "openDialog('needDays', true)"
              },
              "rawAttrsMap": {},
              "parent": "~children~1~children~4",
              "children": [
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "type-item"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~4~children~0",
                  "children": [
                    {
                      "type": 3,
                      "text": "\n          预计出签\n          ",
                      "static": true
                    },
                    {
                      "type": 1,
                      "tag": "span",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "red-text"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~0~children~0",
                      "children": [
                        {
                          "type": 2,
                          "expression": "_s(product.earliest_depart_date)",
                          "tokens": [
                            {
                              "@binding": "product.earliest_depart_date"
                            }
                          ],
                          "text": "{{product.earliest_depart_date}}",
                          "static": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"red-text\"",
                      "static": false,
                      "staticRoot": false
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"type-item\"",
                  "static": false,
                  "staticRoot": false
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "type-item"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~4~children~0",
                  "children": [
                    {
                      "type": 3,
                      "text": "\n          办理时长\n          ",
                      "static": true
                    },
                    {
                      "type": 1,
                      "tag": "span",
                      "attrsList": [],
                      "attrsMap": {
                        "v-if": "product.need_days !== product.need_days_longest",
                        "class": "red-text"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~0~children~1",
                      "children": [
                        {
                          "type": 2,
                          "expression": "_s(product.need_days)+\"-\"+_s(product.need_days_longest)",
                          "tokens": [
                            {
                              "@binding": "product.need_days"
                            },
                            "-",
                            {
                              "@binding": "product.need_days_longest"
                            }
                          ],
                          "text": "{{product.need_days}}-{{product.need_days_longest}}",
                          "static": false
                        }
                      ],
                      "if": "product.need_days !== product.need_days_longest",
                      "ifConditions": [
                        {
                          "exp": "product.need_days !== product.need_days_longest",
                          "block": "~children~1~children~4~children~0~children~1~children~1"
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"red-text\"",
                      "static": false,
                      "staticRoot": false,
                      "ifProcessed": true
                    },
                    {
                      "type": 1,
                      "tag": "span",
                      "attrsList": [],
                      "attrsMap": {
                        "v-if": "product.need_days === product.need_days_longest",
                        "class": "red-text"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~0~children~1",
                      "children": [
                        {
                          "type": 2,
                          "expression": "_s(product.need_days)",
                          "tokens": [
                            {
                              "@binding": "product.need_days"
                            }
                          ],
                          "text": "{{product.need_days}}",
                          "static": false
                        }
                      ],
                      "if": "product.need_days === product.need_days_longest",
                      "ifConditions": [
                        {
                          "exp": "product.need_days === product.need_days_longest",
                          "block": "~children~1~children~4~children~0~children~1~children~2"
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"red-text\"",
                      "static": false,
                      "staticRoot": false,
                      "ifProcessed": true
                    },
                    {
                      "type": 3,
                      "text": "\n          工作日\n        ",
                      "static": true
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"type-item\"",
                  "static": false,
                  "staticRoot": false
                }
              ],
              "plain": false,
              "staticClass": "\"card-title\"",
              "hasBindings": true,
              "events": {
                "click": {
                  "value": "openDialog('needDays', true)",
                  "dynamic": false
                }
              },
              "static": false,
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "card-content"
              },
              "rawAttrsMap": {},
              "parent": "~children~1~children~4",
              "children": [
                {
                  "type": 3,
                  "text": "价格",
                  "isComment": true,
                  "static": true
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "price"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~4~children~1",
                  "children": [
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "left"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~1~children~1",
                      "children": [
                        {
                          "type": 1,
                          "tag": "span",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "icon"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~1~children~0",
                          "children": [
                            {
                              "type": 3,
                              "text": "￥",
                              "static": true
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"icon\"",
                          "static": true,
                          "staticInFor": false,
                          "staticRoot": false
                        },
                        {
                          "type": 1,
                          "tag": "em",
                          "attrsList": [],
                          "attrsMap": {
                            "v-if": "product.company_coupon && product.company_coupon.coupon_desc"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~1~children~0",
                          "children": [
                            {
                              "type": 2,
                              "expression": "_s(product.company_coupon.sell_price / 100)",
                              "tokens": [
                                {
                                  "@binding": "product.company_coupon.sell_price / 100"
                                }
                              ],
                              "text": "{{product.company_coupon.sell_price / 100}}",
                              "static": false
                            }
                          ],
                          "if": "product.company_coupon && product.company_coupon.coupon_desc",
                          "ifConditions": [
                            {
                              "exp": "product.company_coupon && product.company_coupon.coupon_desc",
                              "block": "~children~1~children~4~children~1~children~1~children~0~children~1"
                            },
                            {
                              "exp": "product.distributor_discount && product.distributor_discount.desc",
                              "block": {
                                "type": 1,
                                "tag": "em",
                                "attrsList": [],
                                "attrsMap": {
                                  "v-else-if": "product.distributor_discount && product.distributor_discount.desc"
                                },
                                "rawAttrsMap": {},
                                "parent": "~children~1~children~4~children~1~children~1~children~0",
                                "children": [
                                  {
                                    "type": 2,
                                    "expression": "_s(product.distributor_discount.price / 100)",
                                    "tokens": [
                                      {
                                        "@binding": "product.distributor_discount.price / 100"
                                      }
                                    ],
                                    "text": "{{product.distributor_discount.price / 100}}",
                                    "static": false
                                  }
                                ],
                                "elseif": "product.distributor_discount && product.distributor_discount.desc",
                                "plain": true,
                                "static": false,
                                "staticRoot": false
                              }
                            },
                            {
                              "block": {
                                "type": 1,
                                "tag": "em",
                                "attrsList": [],
                                "attrsMap": {
                                  "v-else": ""
                                },
                                "rawAttrsMap": {},
                                "parent": "~children~1~children~4~children~1~children~1~children~0",
                                "children": [
                                  {
                                    "type": 2,
                                    "expression": "_s(product.sell_price / 100)",
                                    "tokens": [
                                      {
                                        "@binding": "product.sell_price / 100"
                                      }
                                    ],
                                    "text": "{{product.sell_price / 100}}",
                                    "static": false
                                  }
                                ],
                                "else": true,
                                "plain": true,
                                "static": false,
                                "staticRoot": false
                              }
                            }
                          ],
                          "plain": true,
                          "static": false,
                          "staticRoot": false,
                          "ifProcessed": true
                        },
                        {
                          "type": 1,
                          "tag": "span",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "unit"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~1~children~0",
                          "children": [
                            {
                              "type": 3,
                              "text": "/人",
                              "static": true
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"unit\"",
                          "static": true,
                          "staticInFor": false,
                          "staticRoot": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"left\"",
                      "static": false,
                      "staticRoot": false
                    },
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "spec"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~1~children~1",
                      "children": [
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "company-coupon",
                            "v-if": "product.company_coupon"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~1~children~1",
                          "children": [
                            {
                              "type": 2,
                              "expression": "_s(product.company_coupon.coupon_desc)",
                              "tokens": [
                                {
                                  "@binding": "product.company_coupon.coupon_desc"
                                }
                              ],
                              "text": "{{product.company_coupon.coupon_desc}}",
                              "static": false
                            }
                          ],
                          "if": "product.company_coupon",
                          "ifConditions": [
                            {
                              "exp": "product.company_coupon",
                              "block": "~children~1~children~4~children~1~children~1~children~1~children~0"
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"company-coupon\"",
                          "static": false,
                          "staticRoot": false,
                          "ifProcessed": true
                        },
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "company-coupon",
                            "v-if": "product.distributor_discount"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~1~children~1",
                          "children": [
                            {
                              "type": 2,
                              "expression": "_s(product.distributor_discount.desc)",
                              "tokens": [
                                {
                                  "@binding": "product.distributor_discount.desc"
                                }
                              ],
                              "text": "{{product.distributor_discount.desc}}",
                              "static": false
                            }
                          ],
                          "if": "product.distributor_discount",
                          "ifConditions": [
                            {
                              "exp": "product.distributor_discount",
                              "block": "~children~1~children~4~children~1~children~1~children~1~children~1"
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"company-coupon\"",
                          "static": false,
                          "staticRoot": false,
                          "ifProcessed": true
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"spec\"",
                      "static": false,
                      "staticRoot": false
                    },
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "right"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~1~children~1",
                      "children": [
                        {
                          "type": 1,
                          "tag": "a",
                          "attrsList": [
                            {
                              "name": "@click",
                              "value": "openDialog('priceDetail', true)"
                            }
                          ],
                          "attrsMap": {
                            "@click": "openDialog('priceDetail', true)"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~1~children~2",
                          "children": [
                            {
                              "type": 3,
                              "text": "价格明细",
                              "static": true
                            }
                          ],
                          "plain": false,
                          "hasBindings": true,
                          "events": {
                            "click": {
                              "value": "openDialog('priceDetail', true)",
                              "dynamic": false
                            }
                          },
                          "static": false,
                          "staticRoot": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"right\"",
                      "static": false,
                      "staticRoot": false
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"price\"",
                  "static": false,
                  "staticRoot": false
                },
                {
                  "type": 3,
                  "text": " 普通用户价格 ",
                  "isComment": true,
                  "static": true
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "origin-price",
                    "v-if": "product.company_coupon && product.company_coupon.coupon_desc || product.distributor_discount && product.distributor_discount.desc"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~4~children~1",
                  "children": [
                    {
                      "type": 1,
                      "tag": "span",
                      "attrsList": [],
                      "attrsMap": {},
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~1~children~3",
                      "children": [
                        {
                          "type": 2,
                          "expression": "\"￥\"+_s(product.sell_price / 100)",
                          "tokens": [
                            "￥",
                            {
                              "@binding": "product.sell_price / 100"
                            }
                          ],
                          "text": "￥{{product.sell_price / 100}}",
                          "static": false
                        }
                      ],
                      "plain": true,
                      "static": false,
                      "staticRoot": false
                    }
                  ],
                  "if": "product.company_coupon && product.company_coupon.coupon_desc || product.distributor_discount && product.distributor_discount.desc",
                  "ifConditions": [
                    {
                      "exp": "product.company_coupon && product.company_coupon.coupon_desc || product.distributor_discount && product.distributor_discount.desc",
                      "block": "~children~1~children~4~children~1~children~3"
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"origin-price\"",
                  "static": false,
                  "staticRoot": false,
                  "ifProcessed": true
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "rate-box"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~4~children~1",
                  "children": [
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "number-box"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~1~children~4",
                      "children": [
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "numnber"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~4~children~0",
                          "children": [
                            {
                              "type": 2,
                              "expression": "_s(product.sales)",
                              "tokens": [
                                {
                                  "@binding": "product.sales"
                                }
                              ],
                              "text": "{{product.sales}}",
                              "static": false
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"numnber\"",
                          "static": false,
                          "staticRoot": false
                        },
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "title"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~4~children~0",
                          "children": [
                            {
                              "type": 3,
                              "text": "已办理人数",
                              "static": true
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"title\"",
                          "static": true,
                          "staticInFor": false,
                          "staticRoot": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"number-box\"",
                      "static": false,
                      "staticRoot": false
                    },
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "number-box"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~1~children~4",
                      "children": [
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "numnber"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~4~children~1",
                          "children": [
                            {
                              "type": 2,
                              "expression": "_s(successRate)+\"%\"",
                              "tokens": [
                                {
                                  "@binding": "successRate"
                                },
                                "%"
                              ],
                              "text": "{{successRate}}%",
                              "static": false
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"numnber\"",
                          "static": false,
                          "staticRoot": false
                        },
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "title"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~4~children~1",
                          "children": [
                            {
                              "type": 3,
                              "text": "综合出签率",
                              "static": true
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"title\"",
                          "static": true,
                          "staticInFor": false,
                          "staticRoot": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"number-box\"",
                      "static": false,
                      "staticRoot": false
                    },
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [
                        {
                          "name": "@click",
                          "value": "goReview"
                        }
                      ],
                      "attrsMap": {
                        "class": "number-box star-box",
                        "@click": "goReview"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~4~children~1~children~4",
                      "children": [
                        {
                          "type": 1,
                          "tag": "stars",
                          "attrsList": [
                            {
                              "name": ":score",
                              "value": "score"
                            }
                          ],
                          "attrsMap": {
                            ":score": "score"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~4~children~2",
                          "children": [],
                          "plain": false,
                          "hasBindings": true,
                          "attrs": [
                            {
                              "name": "score",
                              "value": "score",
                              "dynamic": false
                            }
                          ],
                          "static": false,
                          "staticRoot": false
                        },
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "title star-title"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~1~children~4~children~1~children~4~children~2",
                          "children": [
                            {
                              "type": 2,
                              "expression": "\"\\n              评价(\"+_s(reviews)+\")\\n              \"",
                              "tokens": [
                                "\n              评价(",
                                {
                                  "@binding": "reviews"
                                },
                                ")\n              "
                              ],
                              "text": "\n              评价({{reviews}})\n              ",
                              "static": false
                            },
                            {
                              "type": 1,
                              "tag": "div",
                              "attrsList": [],
                              "attrsMap": {
                                "class": "iconfont icon-arrow_enter go-icon",
                                "v-if": "reviews"
                              },
                              "rawAttrsMap": {},
                              "parent": "~children~1~children~4~children~1~children~4~children~2~children~1",
                              "children": [],
                              "if": "reviews",
                              "ifConditions": [
                                {
                                  "exp": "reviews",
                                  "block": "~children~1~children~4~children~1~children~4~children~2~children~1~children~1"
                                }
                              ],
                              "plain": false,
                              "staticClass": "\"iconfont icon-arrow_enter go-icon\"",
                              "static": false,
                              "staticRoot": false,
                              "ifProcessed": true
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"title star-title\"",
                          "static": false,
                          "staticRoot": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"number-box star-box\"",
                      "hasBindings": true,
                      "events": {
                        "click": {
                          "value": "goReview",
                          "dynamic": false
                        }
                      },
                      "static": false,
                      "staticRoot": false
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"rate-box\"",
                  "static": false,
                  "staticRoot": false
                }
              ],
              "plain": false,
              "staticClass": "\"card-content\"",
              "static": false,
              "staticRoot": false
            }
          ],
          "plain": false,
          "staticClass": "\"info-card\"",
          "static": false,
          "staticRoot": false
        },
        {
          "type": 1,
          "tag": "div",
          "attrsList": [],
          "attrsMap": {
            "class": "procedure-box"
          },
          "rawAttrsMap": {},
          "parent": "~children~1",
          "children": [
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "procedure-header"
              },
              "rawAttrsMap": {},
              "parent": "~children~1~children~5",
              "children": [
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "left-box"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~5~children~0",
                  "children": [],
                  "plain": false,
                  "staticClass": "\"left-box\"",
                  "static": true,
                  "staticInFor": false,
                  "staticRoot": false
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [
                    {
                      "name": "@click",
                      "value": "openDialog('service', true)"
                    }
                  ],
                  "attrsMap": {
                    "class": "right-box",
                    "@click": "openDialog('service', true)"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~5~children~0",
                  "children": [
                    {
                      "type": 3,
                      "text": "\n          查看更多\n          ",
                      "static": true
                    },
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "right-icon more"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~5~children~0~children~1",
                      "children": [],
                      "plain": false,
                      "staticClass": "\"right-icon more\"",
                      "static": true,
                      "staticInFor": false,
                      "staticRoot": false
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"right-box\"",
                  "hasBindings": true,
                  "events": {
                    "click": {
                      "value": "openDialog('service', true)",
                      "dynamic": false
                    }
                  },
                  "static": false,
                  "staticRoot": false
                }
              ],
              "plain": false,
              "staticClass": "\"procedure-header\"",
              "static": false,
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [
                {
                  "name": "@click",
                  "value": "openDialog('service', true)"
                }
              ],
              "attrsMap": {
                "class": "procedure-container",
                "@click": "openDialog('service', true)"
              },
              "rawAttrsMap": {},
              "parent": "~children~1~children~5",
              "children": [
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "procedure-item",
                    "v-for": "(item, idx) in procedureList",
                    ":key": "idx"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~1~children~5~children~1",
                  "children": [
                    {
                      "type": 1,
                      "tag": "img",
                      "attrsList": [
                        {
                          "name": ":src",
                          "value": "item.icon"
                        }
                      ],
                      "attrsMap": {
                        ":src": "item.icon"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~5~children~1~children~0",
                      "children": [],
                      "plain": false,
                      "hasBindings": true,
                      "attrs": [
                        {
                          "name": "src",
                          "value": "item.icon",
                          "dynamic": false
                        }
                      ],
                      "static": false,
                      "staticRoot": false
                    },
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "procedure-text"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~1~children~5~children~1~children~0",
                      "children": [
                        {
                          "type": 2,
                          "expression": "_s(item.title)",
                          "tokens": [
                            {
                              "@binding": "item.title"
                            }
                          ],
                          "text": "{{item.title}}",
                          "static": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"procedure-text\"",
                      "static": false,
                      "staticRoot": false
                    }
                  ],
                  "for": "procedureList",
                  "alias": "item",
                  "iterator1": "idx",
                  "key": "idx",
                  "plain": false,
                  "staticClass": "\"procedure-item\"",
                  "static": false,
                  "staticRoot": false,
                  "forProcessed": true
                }
              ],
              "plain": false,
              "staticClass": "\"procedure-container\"",
              "hasBindings": true,
              "events": {
                "click": {
                  "value": "openDialog('service', true)",
                  "dynamic": false
                }
              },
              "static": false,
              "staticRoot": false
            }
          ],
          "plain": false,
          "staticClass": "\"procedure-box\"",
          "static": false,
          "staticRoot": false
        }
      ],
      "plain": false,
      "staticClass": "\"goods-info\"",
      "static": false,
      "staticRoot": false
    },
    {
      "type": 3,
      "text": " 各种浮层 ",
      "isComment": true,
      "static": true
    },
    {
      "type": 1,
      "tag": "div",
      "attrsList": [
        {
          "name": "v-transfer-dom",
          "value": ""
        }
      ],
      "attrsMap": {
        "v-transfer-dom": ""
      },
      "rawAttrsMap": {},
      "parent": "~",
      "children": [
        {
          "type": 3,
          "text": " 办理时长浮层 need-days-dialog 下面有用到",
          "isComment": true,
          "static": true
        },
        {
          "type": 1,
          "tag": "x-dialog",
          "attrsList": [
            {
              "name": "v-model",
              "value": "popupSwitches.needDays"
            }
          ],
          "attrsMap": {
            "class": "common-dialog need-days-dialog",
            "v-model": "popupSwitches.needDays"
          },
          "rawAttrsMap": {},
          "parent": "~children~3",
          "children": [
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "dialog-header"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~1",
              "children": [
                {
                  "type": 3,
                  "text": "办理时长"
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-header\"",
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "dialog-content"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~1",
              "children": [
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "days"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~3~children~1~children~1",
                  "children": [
                    {
                      "type": 1,
                      "tag": "span",
                      "attrsList": [],
                      "attrsMap": {
                        "v-if": "product.need_days !== product.need_days_longest"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~3~children~1~children~1~children~0",
                      "children": [
                        {
                          "type": 2,
                          "expression": "_s(product.need_days)+\"-\"+_s(product.need_days_longest)",
                          "tokens": [
                            {
                              "@binding": "product.need_days"
                            },
                            "-",
                            {
                              "@binding": "product.need_days_longest"
                            }
                          ],
                          "text": "{{product.need_days}}-{{product.need_days_longest}}"
                        }
                      ],
                      "if": "product.need_days !== product.need_days_longest",
                      "ifConditions": [
                        {
                          "exp": "product.need_days !== product.need_days_longest",
                          "block": "~children~3~children~1~children~1~children~0~children~0"
                        }
                      ],
                      "plain": true,
                      "staticRoot": false,
                      "ifProcessed": true
                    },
                    {
                      "type": 1,
                      "tag": "span",
                      "attrsList": [],
                      "attrsMap": {
                        "v-if": "product.need_days === product.need_days_longest"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~3~children~1~children~1~children~0",
                      "children": [
                        {
                          "type": 2,
                          "expression": "_s(product.need_days)",
                          "tokens": [
                            {
                              "@binding": "product.need_days"
                            }
                          ],
                          "text": "{{product.need_days}}"
                        }
                      ],
                      "if": "product.need_days === product.need_days_longest",
                      "ifConditions": [
                        {
                          "exp": "product.need_days === product.need_days_longest",
                          "block": "~children~3~children~1~children~1~children~0~children~1"
                        }
                      ],
                      "plain": true,
                      "staticRoot": false,
                      "ifProcessed": true
                    },
                    {
                      "type": 3,
                      "text": "\n          工作日\n        "
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"days\"",
                  "staticRoot": false
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "detail"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~3~children~1~children~1",
                  "children": [
                    {
                      "type": 2,
                      "expression": "_s(product.need_days_detail)",
                      "tokens": [
                        {
                          "@binding": "product.need_days_detail"
                        }
                      ],
                      "text": "{{product.need_days_detail}}"
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"detail\"",
                  "staticRoot": false
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-content\"",
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [
                {
                  "name": "@click",
                  "value": "openDialog('needDays', false)"
                }
              ],
              "attrsMap": {
                "class": "dialog-close",
                "@click": "openDialog('needDays', false)"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~1",
              "children": [
                {
                  "type": 3,
                  "text": "知道了"
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-close\"",
              "hasBindings": true,
              "events": {
                "click": {
                  "value": "openDialog('needDays', false)",
                  "dynamic": false
                }
              },
              "staticRoot": false
            }
          ],
          "plain": false,
          "staticClass": "\"common-dialog need-days-dialog\"",
          "hasBindings": true,
          "directives": [
            {
              "name": "model",
              "rawName": "v-model",
              "value": "popupSwitches.needDays",
              "arg": null,
              "isDynamicArg": false
            }
          ],
          "static": false,
          "staticRoot": false,
          "model": {
            "value": "(popupSwitches.needDays)",
            "expression": "\"popupSwitches.needDays\"",
            "callback": "function ($$v) {$set(popupSwitches, \"needDays\", $$v)}"
          }
        },
        {
          "type": 3,
          "text": " 费用明细浮层 price-detail-dialog 下面有用到 ",
          "isComment": true,
          "static": true
        },
        {
          "type": 1,
          "tag": "x-dialog",
          "attrsList": [
            {
              "name": "v-model",
              "value": "popupSwitches.priceDetail"
            }
          ],
          "attrsMap": {
            "class": "common-dialog price-detail-dialog",
            "v-model": "popupSwitches.priceDetail"
          },
          "rawAttrsMap": {},
          "parent": "~children~3",
          "children": [
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "dialog-header"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~3",
              "children": [
                {
                  "type": 3,
                  "text": "费用明细"
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-header\"",
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "dialog-content"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~3",
              "children": [
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "days",
                    "v-if": "product.company_coupon && product.company_coupon.coupon_desc"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~3~children~3~children~1",
                  "children": [
                    {
                      "type": 2,
                      "expression": "\"\\n          ￥\"+_s(product.company_coupon.sell_price / 100)+\"\\n          \"",
                      "tokens": [
                        "\n          ￥",
                        {
                          "@binding": "product.company_coupon.sell_price / 100"
                        },
                        "\n          "
                      ],
                      "text": "\n          ￥{{product.company_coupon.sell_price / 100}}\n          "
                    },
                    {
                      "type": 1,
                      "tag": "span",
                      "attrsList": [],
                      "attrsMap": {
                        "class": "origin"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~3~children~3~children~1~children~0",
                      "children": [
                        {
                          "type": 2,
                          "expression": "\"￥\"+_s(product.sell_price / 100)",
                          "tokens": [
                            "￥",
                            {
                              "@binding": "product.sell_price / 100"
                            }
                          ],
                          "text": "￥{{product.sell_price / 100}}"
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"origin\"",
                      "staticRoot": false
                    }
                  ],
                  "if": "product.company_coupon && product.company_coupon.coupon_desc",
                  "ifConditions": [
                    {
                      "exp": "product.company_coupon && product.company_coupon.coupon_desc",
                      "block": "~children~3~children~3~children~1~children~0"
                    },
                    {
                      "exp": "product.distributor_discount && product.distributor_discount.desc",
                      "block": {
                        "type": 1,
                        "tag": "div",
                        "attrsList": [],
                        "attrsMap": {
                          "class": "days",
                          "v-else-if": "product.distributor_discount && product.distributor_discount.desc"
                        },
                        "rawAttrsMap": {},
                        "parent": "~children~3~children~3~children~1",
                        "children": [
                          {
                            "type": 2,
                            "expression": "\"\\n          ￥\"+_s(product.distributor_discount.price / 100)+\"\\n          \"",
                            "tokens": [
                              "\n          ￥",
                              {
                                "@binding": "product.distributor_discount.price / 100"
                              },
                              "\n          "
                            ],
                            "text": "\n          ￥{{product.distributor_discount.price / 100}}\n          "
                          },
                          {
                            "type": 1,
                            "tag": "span",
                            "attrsList": [],
                            "attrsMap": {
                              "class": "origin"
                            },
                            "rawAttrsMap": {},
                            "parent": "~children~3~children~3~children~1~children~0~ifConditions~1~block",
                            "children": [
                              {
                                "type": 2,
                                "expression": "\"￥\"+_s(product.sell_price / 100)",
                                "tokens": [
                                  "￥",
                                  {
                                    "@binding": "product.sell_price / 100"
                                  }
                                ],
                                "text": "￥{{product.sell_price / 100}}"
                              }
                            ],
                            "plain": false,
                            "staticClass": "\"origin\"",
                            "staticRoot": false
                          }
                        ],
                        "elseif": "product.distributor_discount && product.distributor_discount.desc",
                        "plain": false,
                        "staticClass": "\"days\"",
                        "staticRoot": false
                      }
                    },
                    {
                      "block": {
                        "type": 1,
                        "tag": "div",
                        "attrsList": [],
                        "attrsMap": {
                          "class": "days",
                          "v-else": ""
                        },
                        "rawAttrsMap": {},
                        "parent": "~children~3~children~3~children~1",
                        "children": [
                          {
                            "type": 2,
                            "expression": "\"￥\"+_s(product.sell_price / 100)",
                            "tokens": [
                              "￥",
                              {
                                "@binding": "product.sell_price / 100"
                              }
                            ],
                            "text": "￥{{product.sell_price / 100}}"
                          }
                        ],
                        "else": true,
                        "plain": false,
                        "staticClass": "\"days\"",
                        "staticRoot": false
                      }
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"days\"",
                  "staticRoot": false,
                  "ifProcessed": true
                },
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "detail"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~3~children~3~children~1",
                  "children": [
                    {
                      "type": 2,
                      "expression": "_s(product.price_detail)",
                      "tokens": [
                        {
                          "@binding": "product.price_detail"
                        }
                      ],
                      "text": "{{product.price_detail}}"
                    }
                  ],
                  "plain": false,
                  "staticClass": "\"detail\"",
                  "staticRoot": false
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-content\"",
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [
                {
                  "name": "@click",
                  "value": "openDialog('priceDetail', false)"
                }
              ],
              "attrsMap": {
                "class": "dialog-close",
                "@click": "openDialog('priceDetail', false)"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~3",
              "children": [
                {
                  "type": 3,
                  "text": "知道了"
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-close\"",
              "hasBindings": true,
              "events": {
                "click": {
                  "value": "openDialog('priceDetail', false)",
                  "dynamic": false
                }
              },
              "staticRoot": false
            }
          ],
          "plain": false,
          "staticClass": "\"common-dialog price-detail-dialog\"",
          "hasBindings": true,
          "directives": [
            {
              "name": "model",
              "rawName": "v-model",
              "value": "popupSwitches.priceDetail",
              "arg": null,
              "isDynamicArg": false
            }
          ],
          "static": false,
          "staticRoot": false,
          "model": {
            "value": "(popupSwitches.priceDetail)",
            "expression": "\"popupSwitches.priceDetail\"",
            "callback": "function ($$v) {$set(popupSwitches, \"priceDetail\", $$v)}"
          }
        },
        {
          "type": 3,
          "text": " 服务特色 ",
          "isComment": true,
          "static": true
        },
        {
          "type": 1,
          "tag": "x-dialog",
          "attrsList": [
            {
              "name": "v-model",
              "value": "popupSwitches.service"
            }
          ],
          "attrsMap": {
            "class": "common-dialog service-dialog",
            "v-model": "popupSwitches.service"
          },
          "rawAttrsMap": {},
          "parent": "~children~3",
          "children": [
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "dialog-header"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~5",
              "children": [
                {
                  "type": 3,
                  "text": "服务特色"
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-header\"",
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [],
              "attrsMap": {
                "class": "dialog-content"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~5",
              "children": [
                {
                  "type": 1,
                  "tag": "div",
                  "attrsList": [],
                  "attrsMap": {
                    "class": "serve-item",
                    "v-for": "(item, idx) in procedureList",
                    ":key": "idx"
                  },
                  "rawAttrsMap": {},
                  "parent": "~children~3~children~5~children~1",
                  "children": [
                    {
                      "type": 1,
                      "tag": "img",
                      "attrsList": [
                        {
                          "name": ":src",
                          "value": "item.icon"
                        }
                      ],
                      "attrsMap": {
                        ":src": "item.icon",
                        "class": "icon"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~3~children~5~children~1~children~0",
                      "children": [],
                      "plain": false,
                      "staticClass": "\"icon\"",
                      "hasBindings": true,
                      "attrs": [
                        {
                          "name": "src",
                          "value": "item.icon",
                          "dynamic": false
                        }
                      ],
                      "staticRoot": false
                    },
                    {
                      "type": 1,
                      "tag": "div",
                      "attrsList": [
                        {
                          "name": "@click",
                          "value": "goDesc(idx)"
                        }
                      ],
                      "attrsMap": {
                        "class": "content",
                        "@click": "goDesc(idx)"
                      },
                      "rawAttrsMap": {},
                      "parent": "~children~3~children~5~children~1~children~0",
                      "children": [
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "title"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~3~children~5~children~1~children~0~children~1",
                          "children": [
                            {
                              "type": 2,
                              "expression": "_s(item.title)",
                              "tokens": [
                                {
                                  "@binding": "item.title"
                                }
                              ],
                              "text": "{{item.title}}"
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"title\"",
                          "staticRoot": false
                        },
                        {
                          "type": 1,
                          "tag": "div",
                          "attrsList": [],
                          "attrsMap": {
                            "class": "desc"
                          },
                          "rawAttrsMap": {},
                          "parent": "~children~3~children~5~children~1~children~0~children~1",
                          "children": [
                            {
                              "type": 2,
                              "expression": "_s(item.desc)",
                              "tokens": [
                                {
                                  "@binding": "item.desc"
                                }
                              ],
                              "text": "{{item.desc}}"
                            }
                          ],
                          "plain": false,
                          "staticClass": "\"desc\"",
                          "staticRoot": false
                        }
                      ],
                      "plain": false,
                      "staticClass": "\"content\"",
                      "hasBindings": true,
                      "events": {
                        "click": {
                          "value": "goDesc(idx)",
                          "dynamic": false
                        }
                      },
                      "staticRoot": false
                    }
                  ],
                  "for": "procedureList",
                  "alias": "item",
                  "iterator1": "idx",
                  "key": "idx",
                  "plain": false,
                  "staticClass": "\"serve-item\"",
                  "staticRoot": false,
                  "forProcessed": true
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-content\"",
              "staticRoot": false
            },
            {
              "type": 1,
              "tag": "div",
              "attrsList": [
                {
                  "name": "@click",
                  "value": "openDialog('service', false)"
                }
              ],
              "attrsMap": {
                "class": "dialog-close",
                "@click": "openDialog('service', false)"
              },
              "rawAttrsMap": {},
              "parent": "~children~3~children~5",
              "children": [
                {
                  "type": 3,
                  "text": "知道了"
                }
              ],
              "plain": false,
              "staticClass": "\"dialog-close\"",
              "hasBindings": true,
              "events": {
                "click": {
                  "value": "openDialog('service', false)",
                  "dynamic": false
                }
              },
              "staticRoot": false
            }
          ],
          "plain": false,
          "staticClass": "\"common-dialog service-dialog\"",
          "hasBindings": true,
          "directives": [
            {
              "name": "model",
              "rawName": "v-model",
              "value": "popupSwitches.service",
              "arg": null,
              "isDynamicArg": false
            }
          ],
          "static": false,
          "staticRoot": false,
          "model": {
            "value": "(popupSwitches.service)",
            "expression": "\"popupSwitches.service\"",
            "callback": "function ($$v) {$set(popupSwitches, \"service\", $$v)}"
          }
        }
      ],
      "plain": false,
      "hasBindings": true,
      "directives": [
        {
          "name": "transfer-dom",
          "rawName": "v-transfer-dom",
          "value": "",
          "arg": null,
          "isDynamicArg": false
        }
      ],
      "static": false,
      "staticRoot": false
    }
  ],
  "plain": false,
  "styleBinding": "pdv.backgroundImage(backgrounImage)",
  "attrs": [
    {
      "name": "id",
      "value": "\"base-info\""
    }
  ],
  "static": false,
  "staticRoot": false
}