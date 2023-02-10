import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";

import { idServiceGetNewId } from "./services/idService";
import ChampionshipPage from "./pages/ChampionshipPage";
import Main from "./components/Main";
import Header from "./components/Header";
import Selector from "./components/Selector";

let currentYear = 2003;
let lastYear = 2015;

// prettier-ignore
const CHAMPIONSHIP_YEARS = 
  Array.from({ length: lastYear - currentYear + 1 }).map(() => currentYear++);

const ROUTES = CHAMPIONSHIP_YEARS.map((year) => ({
  id: idServiceGetNewId(),
  description: year,
  path: `/${year}`,
  component: <ChampionshipPage />,
}));

export default function App() {
  const history = useHistory();
  const location = useLocation();
  const selectedYear = parseInt(location.pathname.substring(1), 10) || null;

  function handleYearChange(newYear) {
    history.push(`/${newYear}`);
  }

  function handlePreviousOption() {
    history.push(`/${selectedYear - 1}`);
  }

  function handleNextOption() {
    history.push(`/${selectedYear + 1}`);
  }

  return (
    <>
      <Header>Desafio Final React</Header>

      <Main>
        {selectedYear && (
          <nav className="flex flex-row items-center justify-center space-x-4">
            <Selector
              selected={selectedYear}
              onSelectChange={handleYearChange}
              onPrevious={handlePreviousOption}
              onNext={handleNextOption}
            >
              {CHAMPIONSHIP_YEARS.map((year) => ({
                id: year,
                description: year.toString(),
              }))}
            </Selector>
          </nav>
        )}
      </Main>

      <Switch>
        {ROUTES.map(({ id, path, component }) => {
          return (
            <Route key={id} path={path} exact>
              {component}
            </Route>
          );
        })}

        {/* A rota padrão é 2003 */}
        <Route key="home-route" path="/" exact>
          <Redirect to="/2003" />
        </Route>
      </Switch>
    </>
  );
}
