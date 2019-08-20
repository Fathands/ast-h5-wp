<template>
  <div id="base-info" v-bind:style="pdv.backgroundImage(backgrounImage)">
    <img class="back-icon" src="../../../assets/imgs/order/back.png" @click="goBack" />

    <div class="goods-info">
      <!--商品名称-->
      <div class="product-name">{{product.country}} {{product.visa_type}}·{{product.product_name}}</div>

      <div class="tags-box">
        <div class="tag-item" v-for="(item, index) in product.tag" :key="index">{{item}}</div>
      </div>

      <div class="features">
        <!-- 信息项 -->
        <div class="feature-item" v-for="item in product.common_info" :key="item.title">
          <div class="item-title" v-text="item.title"></div>
          <div>
            <template v-if="item.type === 0">
              <span v-text="item.num"></span>
              <span v-text="item.unit"></span>
            </template>
            <span v-else v-text="item.unit"></span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <div class="card-title" @click="openDialog('needDays', true)">
          <div class="type-item">
            预计出签
            <span class="red-text">{{product.earliest_depart_date}}</span>
          </div>
          <div class="type-item">
            办理时长
            <span
              v-if="product.need_days !== product.need_days_longest"
              class="red-text"
            >{{product.need_days}}-{{product.need_days_longest}}</span>
            <span
              v-if="product.need_days === product.need_days_longest"
              class="red-text"
            >{{product.need_days}}</span>
            工作日
          </div>
        </div>

        <div class="card-content">
          <!--价格-->
          <div class="price">
            <div class="left">
              <span class="icon">￥</span>
              <em
                v-if="product.company_coupon && product.company_coupon.coupon_desc"
              >{{product.company_coupon.sell_price / 100}}</em>
              <em
                v-else-if="product.distributor_discount && product.distributor_discount.desc"
              >{{product.distributor_discount.price / 100}}</em>
              <em v-else>{{product.sell_price / 100}}</em>
              <span class="unit">/人</span>
            </div>
            <div class="spec">
              <div
                class="company-coupon"
                v-if="product.company_coupon"
              >{{product.company_coupon.coupon_desc}}</div>
              <div
                class="company-coupon"
                v-if="product.distributor_discount"
              >{{product.distributor_discount.desc}}</div>
            </div>
            <div class="right">
              <a @click="openDialog('priceDetail', true)">价格明细</a>
            </div>
          </div>

          <!-- 普通用户价格 -->
          <div
            class="origin-price"
            v-if="product.company_coupon && product.company_coupon.coupon_desc || product.distributor_discount && product.distributor_discount.desc"
          >
            <span>￥{{product.sell_price / 100}}</span>
          </div>

          <div class="rate-box">
            <div class="number-box">
              <div class="numnber">{{product.sales}}</div>
              <div class="title">已办理人数</div>
            </div>

            <div class="number-box">
              <div class="numnber">{{successRate}}%</div>
              <div class="title">综合出签率</div>
            </div>

            <div class="number-box star-box" @click="goReview">
              <stars :score="score"></stars>
              <div class="title star-title">
                评价({{reviews}})
                <div class="iconfont icon-arrow_enter go-icon" v-if="reviews"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="procedure-box">
        <div class="procedure-header">
          <div class="left-box"></div>
          <div class="right-box" @click="openDialog('service', true)">
            查看更多
            <div class="right-icon more"></div>
          </div>
        </div>

        <div class="procedure-container" @click="openDialog('service', true)">
          <div class="procedure-item" v-for="(item, idx) in procedureList" :key="idx">
            <img :src="item.icon" />
            <div class="procedure-text">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 各种浮层 -->
    <div v-transfer-dom>
      <!-- 办理时长浮层 need-days-dialog 下面有用到-->
      <x-dialog class="common-dialog need-days-dialog" v-model="popupSwitches.needDays">
        <div class="dialog-header">办理时长</div>
        <div class="dialog-content">
          <div class="days">
            <span
              v-if="product.need_days !== product.need_days_longest"
            >{{product.need_days}}-{{product.need_days_longest}}</span>
            <span v-if="product.need_days === product.need_days_longest">{{product.need_days}}</span>
            工作日
          </div>
          <div class="detail">{{product.need_days_detail}}</div>
        </div>
        <div class="dialog-close" @click="openDialog('needDays', false)">知道了</div>
      </x-dialog>

      <!-- 费用明细浮层 price-detail-dialog 下面有用到 -->
      <x-dialog class="common-dialog price-detail-dialog" v-model="popupSwitches.priceDetail">
        <div class="dialog-header">费用明细</div>
        <div class="dialog-content">
          <div class="days" v-if="product.company_coupon && product.company_coupon.coupon_desc">
            ￥{{product.company_coupon.sell_price / 100}}
            <span
              class="origin"
            >￥{{product.sell_price / 100}}</span>
          </div>
          <div
            class="days"
            v-else-if="product.distributor_discount && product.distributor_discount.desc"
          >
            ￥{{product.distributor_discount.price / 100}}
            <span
              class="origin"
            >￥{{product.sell_price / 100}}</span>
          </div>
          <div class="days" v-else>￥{{product.sell_price / 100}}</div>
          <div class="detail">{{product.price_detail}}</div>
        </div>
        <div class="dialog-close" @click="openDialog('priceDetail', false)">知道了</div>
      </x-dialog>

      <!-- 服务特色 -->
      <x-dialog class="common-dialog service-dialog" v-model="popupSwitches.service">
        <div class="dialog-header">服务特色</div>
        <div class="dialog-content">
          <div class="serve-item" v-for="(item, idx) in procedureList" :key="idx">
            <img :src="item.icon" class="icon" />
            <div class="content" @click="goDesc(idx)">
              <div class="title">{{item.title}}</div>
              <div class="desc">{{item.desc}}</div>
            </div>
          </div>
        </div>
        <div class="dialog-close" @click="openDialog('service', false)">知道了</div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { TransferDom, XDialog } from 'vux';
import stars from '../../../components/Stars';

import backgrounImage from '../../../assets/imgs/product//2.3.0/goods-bg.png';
import utils from '../../../util/utils';

import iconPrice from '../../../assets/imgs/product/2.3.0/icon-price.png';
import iconPhoto from '../../../assets/imgs/product/2.3.0/icon-photo.png';
import iconPhone from '../../../assets/imgs/product/2.3.0/icon-phone.png';
import iconCheck from '../../../assets/imgs/product/2.3.0/icon-check.png';
import iconFast from '../../../assets/imgs/product/2.3.0/icon-fast.png';
import iconPlus from '../../../assets/imgs/product/2.3.0/icon-plus.png';

export default {
  name: 'productBasicInfo',
  directives: {
    TransferDom,
  },
  components: {
    XDialog,
    stars,
  },
  props: {
    productId: Number,
    product: Object,
    passRate: {
      type: Number,
      default() {
        return 10000;
      },
    },
    reviews: {
      type: Number,
      default() {
        return 'test';
      },
    },
    sumScore: {
      type: Number,
      default() {
        return {a: 1};
      },
    },
  },
  data() {
    return {
      successRate: (Math.floor(this.passRate / 10) / 10)
        .toFixed(1)
        .replace('.0', ''),
      backgrounImage,
      popupSwitches: {
        needDays: false,
        priceDetail: false,
        service: false,
      },
      score: this.getScore(),
      show: true,
      procedureList: [
        {
          title: '拒签退全款',
          icon: iconPrice,
          desc: '发生拒签时，符合条件的申请人可享受拒签退全款服务，点击查看《拒签退全款说明》',
        },
        {
          title: '免费证件照',
          icon: iconPhoto,
          desc: '手机拍摄智能生成证件照，无需前往照相馆，证件照费用全免。',
        },
        {
          title: '手机上传资料',
          icon: iconPhone,
          desc: '手机拍照即可上传资料，在线填写签证申请表，免去打印烦恼。',
        },
        {
          title: '专家审核资料',
          icon: iconCheck,
          desc: '签证专家在线审核资料，提升您的签证通过率。',
        },
        {
          title: '急速送签使馆',
          icon: iconFast,
          desc: '资料审核后直接送签使馆，给您更快的出签速度！',
        },
        {
          title: '数据高级加密',
          icon: iconPlus,
          desc: '资料数据采用AES高级加密标准，确保您的资料安全。',
        },
      ],
    };
  },
  created() {
    this.init()
  },
  mounted() {
    this.ready('passport')
  },
  destroyed() {
    this.destroyed()
  },
  methods: {
    parseInt,
    openDialog(switchName, open) {
      this.show = true

      const name = {
        priceDetail: '.price-detail-dialog',
        needDays: '.need-days-dialog',
      };

      // 注意此处的classname
      utils.disableMaskScrollBody(name[switchName]);
    },
    goBack() {
      this.$router.replace({
        name: 'ProductList',
        params: { countryId: this.product.visa_country_id},
      });
      
      this.show = false;
    },
    getScore() {
      if (this.reviews && this.reviews !== 0) {
        return this.sumScore / this.reviews;
      }
      return 5;
    },
    goReview() {
      if (this.reviews) {
        this.$router.push({
          name: 'Review',
          params: { productId: this.productId },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./assets/styles/mixin.less";

#base-info {
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  color: @white;
  font-size: 0.4rem;
  padding-top: 0.75rem;
  padding-bottom: 0.2rem;

  .back-icon {
    width: 0.48rem;
    height: 0.48rem;
    position: absolute;
    left: 0.2rem;
    top: 0.15rem;
  }

  .goods-info {
    padding: 0 0.24rem;
  }

  .product-name {
    font-size: 0.4rem;
    line-height: 0.44rem;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    p {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 0.6rem;
      height: 1.2rem;
    }
  }

  .tags-box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.11rem;
    transform: translateX(-0.12rem);
    .tag-item {
      font-size: 0.22rem;
      background-color: rgba(0, 0, 0, 0.1);
      padding: 0.07rem 0.13rem;
      margin-top: 0.12rem;
      margin-left: 0.12rem;
    }
  }

  .features {
    text-align: center;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.22rem;
    margin-top: 0.49rem;

    .feature-item {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .item-title {
      color: rgba(255, 255, 255, 0.6);
      margin-right: 0.05rem;
    }
    span {
      color: #ffffff;
    }
  }

  .info-card {
    background-color: #ffffff;
    box-shadow: 0rem 0.08rem 0.32rem 0rem rgba(0, 0, 0, 0.08);
    border-radius: 0.16rem;
    margin-top: 0.26rem;
    overflow: hidden;
    .card-title {
      background-color: #fff9ec;
      display: flex;
      flex-direction: row;
      height: 0.8rem;
      align-items: center;
      padding-left: 0.68rem;
      background-image: url("../../../assets/imgs/product/2.3.0/warn.png");
      background-repeat: no-repeat;
      background-position: 0.24rem center;
      background-size: 0.32rem 0.34rem;
      position: relative;
      &::after {
        content: "";
        background-image: url("../../../assets/imgs/product/2.3.0/question-mark.png");
        background-repeat: no-repeat;
        width: 0.43rem;
        height: 0.43rem;
        background-size: cover;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.24rem;
      }
      .type-item {
        font-size: 0.24rem;
        color: #333333;
        & + .type-item {
          margin-left: 0.24rem;
        }
        .red-text {
          display: inline-block;
          margin-left: 0.09rem;
          margin-right: 0.06rem;
          color: #fc4d52;
        }
      }
    }
    .card-content {
      padding: 0.4rem 0.24rem;
    }
  }
  .price {
    padding: 0 0.24rem;
    width: 100%;
    display: flex;
    .left {
      display: flex;
      color: #333333;
      align-items: baseline;
      font-size: 0.64rem;
      .icon {
        font-size: 0.36rem;
        margin-right: 0.04rem;
        display: inline-block;
      }
      .unit {
        font-size: 0.32rem;
        color: #999999;
      }
    }
    .spec {
      align-self: flex-start;
      display: flex;
      align-items: center;
      background-image: url("../../../assets/imgs/product/2.3.0/spec.png");
      background-repeat: no-repeat;
      background-size: cover;
      transform: translateY(0.2rem);
      border-top-right-radius: 0.04rem;
      border-bottom-right-radius: 0.04rem;
      .company-coupon {
        font-size: 0.2rem;
        color: #ffffff;
        padding: 0.1rem 0.08rem 0.1rem 0.2rem;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.24rem;
        border: solid 0.02rem #e0e0e0;
        font-size: 0.24rem;
        color: #333333;
        padding: 0.12rem 0.16rem;
      }
    }
  }
  .origin-price {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    padding-left: 0.45rem;
    color: #aaaaaa;
    span {
      text-decoration: line-through;
    }
  }
  .rate-box {
    padding: 0 0.24rem 0 0.48rem;
    display: flex;
    align-items: center;
    margin-top: 0.3rem;
    padding-top: 0.4rem;
    border-top: 1px solid #f0f0f0;

    .number-box {
      flex: 1;
      &.star-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .numnber {
        font-size: 0.32rem;
        color: #333333;
        font-weight: 600;
      }
      .title {
        font-size: 0.24rem;
        color: #999999;
        margin-top: 0.2rem;
        &.star-title {
          display: flex;
          align-items: center;
          margin-top: 0.26rem;
          .icon-arrow_enter {
            color: #f6f6f6;
            font-weight: 800;
            margin-left: 0.06rem;
            transform: translateY(0.02rem);
            &.go-icon {
              font-size: 0.18rem;
              color: @go-icon-color;
            }
          }
        }
      }
    }
  }

  .procedure-box {
    display: flex;
    flex-direction: column;
    background-color: #fffafa;
    border-radius: 0.16rem;
    border: solid 0.01rem @primary;
    padding-top: 0.16rem;
    position: relative;
    margin-top: 0.2rem;
    .procedure-header {
      display: flex;
      justify-content: space-between;
      padding-left: 0.08rem;
      .left-box {
        width: 2.47rem;
        height: 0.56rem;
        background-image: url("../../../assets/imgs/product/2.3.0/procedure-header.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 0 0.15rem;
      }
      .right-box {
        width: 1.68rem;
        height: 0.56rem;
        background-image: url("../../../assets/imgs/product/2.3.0/more-view.png");
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        right: -0.08rem;
        top: 0.16rem;
        font-size: 0.28rem;
        color: #ffffff;
        padding-left: 0.15rem;
        padding-top: 0.08rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .right-icon {
          width: 0.1rem;
          height: 0.18rem;
          background-size: cover;
          background-repeat: no-repeat;
          &.more {
            background-image: url("https://o.666visa.cn/static/pdvwxa/visa-detail/more-right-icon.png");
            margin-left: 0.1rem;
          }
        }
      }
    }

    .procedure-container {
      display: flex;
      flex-wrap: wrap;
      padding: 0.23rem 0.22rem 0.45rem;
      .procedure-item {
        width: 2.18rem;
        height: 1.23rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        image {
          margin: 0.4rem auto 0.15rem;
          width: 0.6rem;
          height: 0.6rem;
        }
        .procedure-text {
          font-size: 0.24rem;
          color: #666666;
        }
      }
    }
  }
}
</style>

<style lang="less">
.need-days-dialog {
  .days {
    font-size: 0.24rem;
    color: @text-gray;

    span {
      font-size: 0.48rem;
      color: @primary;
    }
  }

  .detail {
    font-size: 0.28rem;
    line-height: 0.48rem;
    margin-top: 0.3rem;
    color: @text-silver;
  }
}

.price-detail-dialog {
  .price-detail-dialog {
    .weui-dialog {
      max-width: 80%;
    }
  }
  .days {
    font-size: 0.48rem;
    color: @text-red;

    span.origin {
      font-size: 0.24rem;
      color: @text-gray;
      text-decoration: line-through;
      margin-left: 0.08rem;
    }
  }

  .detail {
    font-size: 0.28rem;
    line-height: 0.48rem;
    margin-top: 0.3rem;
    color: @text-silver;
  }
}

.service-dialog {
  .dialog-content {
    max-height: 300px;
    overflow-y: auto;
    padding-bottom: 0;
    .serve-item {
      display: flex;
      margin-bottom: 0.5rem;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.3rem;
        transform: translateY(-0.06rem);
      }
      .content {
        display: flex;
        flex-direction: column;
        max-width: 5.35rem;
        .title {
          font-size: 0.32rem;
          color: #333333;
          text-align: left;
          font-weight: 600;
          margin-bottom: 0.20rem;
        }
        .desc {
          font-size: 0.28rem;
          line-height: 0.40rem;
          color: #666666;
          text-align: left;
        }
      }
    }
  }
}
</style>

<style lang="less">
@media screen and (min-width: 768px) {
  .price-detail-dialog {
    .weui-dialog {
      width: 50%;
    }
  }
}
</style>


