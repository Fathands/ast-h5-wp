 {
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
        return 99;
      },
    },
    sumScore: {
      type: Number,
      default() {
        return 100;
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
  methods: {
    parseInt,
    openDialog(switchName, open) {
      this.popupSwitches[switchName] = open;

      const name = {
        priceDetail: '.price-detail-dialog',
        needDays: '.need-days-dialog',
      };

      // 注意此处的classname
      utils.disableMaskScrollBody(name[switchName]);
    },
    goBack() {
      if (history.length > 2) {
        history.go(-1);
      } else {
        this.$router.replace({
          name: 'ProductList',
          params: { countryId: this.product.visa_country_id },
        });
      }
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
