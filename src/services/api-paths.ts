export enum ApiPaths {
  Offers = '/offers',
  OfferById = '/offers/{offerId}',
  NearbyOffers = '/offers/{offerId}/nearby',
  Reviews = '/comments/{offerId}',
  Favorite = '/favorite',
  FavoriteEdit = '/favorite/{offerId}/{status}',
  Login = '/login',
  Logout = '/logout',
}
