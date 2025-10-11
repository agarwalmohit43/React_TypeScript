import { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemonsData, setPokemonsData] = useState<any[]>([]);
  const getPokemons = async (offset = 0, limit = 10) => {
    try {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      ).then((res) => res.json());

      const { count, results } = data;

      if (count) {
        const pokemonUrls: any = [];
        results.forEach((pokemon: any) => {
          if (pokemon?.url) {
            const promise = fetch(pokemon.url).then((res) => res.json());
            pokemonUrls.push(promise);
          }
        });
        if (pokemonUrls.length) {
          const pokemons: any = await Promise.all(pokemonUrls);
          setPokemonsData(pokemons);
        } else {
          throw new Error("No pokemons availalbe");
        }
      }
    } catch (err) {
      console.log(`Error occured ${err}`);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      {pokemonsData.length > 0 ? (
        pokemonsData.map(
          (pokemon: { abilities: any; sprites: any; name: string }) => {
            const totalAbilities = pokemon?.abilities
              .filter((item: any) => item.ability.name !== "")
              .map((item: any) => item.ability.name)
              .join(" ");
            return (
              <div
                key={pokemon?.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "2px solid black",
                  padding: "8px",
                  width: "100px",
                  height: "150px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={pokemon?.sprites?.front_default}
                  alt={pokemon?.name}
                  width={50}
                  height={50}
                />
                <strong>{pokemon?.name}</strong>
                <span>{`Abilities: ${totalAbilities}`}</span>
              </div>
            );
          }
        )
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default Pokemon;
