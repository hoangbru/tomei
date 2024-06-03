interface ITheme {
  title: string;
  icon: IconType;
}

interface INavLink extends ITheme {
  path: string;
}

interface IMovie {
  id: string | number;
  poster_path: string;
  original_title: string;
  title: string;
  overview: string;
  backdrop_path: string;
}
