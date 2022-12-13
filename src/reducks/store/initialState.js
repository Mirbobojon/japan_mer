const initialState =
{
  items: {
    list: [],   //商品の一覧
    imageSrc: '',
    imageId: '',
    imageSrcArray: ['','','',''],
    imageIdArray: [],
    imageSrc1: '',
    imageSrc2: '',
    imageSrc3: '',
    imageSrc4: '',
    imageId1: '',
    imageId2: '',
    imageId3: '',
    imageId4: '',
    selectCategory: '',
    selectKeyword: '',
  },
  categories: {
    list: [],
  },
  departments: {
    list: [],
  },
  members: {
    list: [],
    loginStatus: '',
    member_id: '',
    name: '',
    applicationMailAddress: '',
    reissueMailAddress: '',

    packApplicationValue:[],
  },
  admins: {
    list: [],
    loginStatus: '',
    admin_id: '',
    name: '',
    reissueMailAddress: '',
  },
  news: {
    list: [],
  },
  mailingListMembers: {
    list: [],
    mailingList: [],
  },
  mails: {
    list: [],
    mailingList: [],
    destinationType: '1',
    title: '',
    body: '',
    newAddFlag: '',
  },
  pageInfo2: {
    moveToTopAfterLogin : false
  },
  pageInfos: {
    floors: [],
    h1: '',
    loading: false,
  },
  favorites:{
    list: [],
  },
  carts:{
    list: [],
  },
  orders:{
    list: [],
    payType: '',
    postAddress: [{
      'family_name': '',
      'first_name': '',
      'family_name_furigana': '',
      'first_name_furigana': '',
      'postal_code': '',
      'address': '',
      'address_1': '',
      'address_2': '',
      'telnumber': '',
      'additionalShippingFee': 0,
      'isAddressSeparated': true,
    }],
    history: [],
    allOrder: [],
    selectOrder:[]
  },
}

export default initialState