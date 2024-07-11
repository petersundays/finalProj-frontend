import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Card,
  Modal,
} from "react-bootstrap";
import { Input, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProjectNew.css";
import OthersProgressBar from "../OthersProgressBar/OthersProgressBar";
import { userStore } from "../../stores/UserStore.jsx";
import { projectStore } from "../../stores/ProjectStore.jsx";
import {
  Base_url_admins,
  Base_url_components_resources,
  Base_url_keywords,
  Base_url_projects,
  Base_url_skills,
  Base_url_users,
  Base_url_lab,
} from "../../functions/UsersFunctions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const ProjectNew = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const loggedUser = userStore((state) => state.loggedUser);
  console.log("loggedUser: ", loggedUser);
  const usersListFromStore = userStore((state) => state.userList);
  const usersList = usersListFromStore.filter(
    (user) => user.id !== loggedUser.id
  );

  const loggedUserToken = loggedUser.sessionToken;
  const loggedUserId = loggedUser.id;
  console.log("loggedUserToken: ", loggedUserToken);
  console.log("loggedUserId", loggedUserId);

  const [enumsFetched, setEnumsFetched] = useState(false);
  const [maxUsers, setMaxUsers] = useState(1);

  const project = projectStore((state) => state.newProject);
  const setProject = projectStore((state) => state.setNewProject);
  const clearProject = projectStore((state) => state.resetNewProject);

  const [keywordsList, setKeywordsList] = useState([]);
  const [keywordsInputValue, setKeywordsInputValue] = useState("");

  const [skillsList, setSkillsList] = useState([]);
  const [skillType, setSkillType] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [customSkillList, setCustomSkillList] = useState([]);
  const [skillsInputValue, setSkillsInputValue] = useState("");
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showSkills, setShowSkills] = useState([]);
  const [previousSelectedSkills, setPreviousSelectedSkills] = useState([]);

  const [asset, setAsset] = useState({
    type: 1,
    name: "",
    description: "",
    partNumber: 0,
    brand: "",
    supplier: "",
    supplierContact: "",
    quantity: 1,
    observations: "",
  });
  const [assetsList, setAssetsList] = useState([]);
  const [assetType, setAssetType] = useState("Component");
  const [assetsInputValue, setAssetsInputValue] = useState("");
  const [customAssetList, setCustomAssetList] = useState([]);
  const [customAsset, setCustomAsset] = useState("");
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showAssetQuantityModal, setShowAssetQuantityModal] = useState(false);
  const [assetQuantity, setAssetQuantity] = useState(1);
  const [showAssets, setShowAssets] = useState([]);
  const [selectedAssetToModal, setSelectedAssetToModal] = useState({});
  const [selectedAssetIdToModal, setSelectedAssetIdToModal] = useState(null);
  const [previousSelectedAssets, setPreviousSelectedAssets] = useState([]);

  const [teamType, setTeamType] = useState(3);
  const [showUsers, setShowUsers] = useState([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [nameToTeamModal, setNameToTeamModal] = useState("");
  const [idToTeamModal, setIdToTeamModal] = useState(0);
  const [previousSelectedTeam, setPreviousSelectedTeam] = useState([]);
  const [teamStore, setTeamStore] = useState([]);

  const [skillsEnumList, setSkillsEnumList] = useState([]);
  const [labEnumList, setLabEnumList] = useState([]);
  const [selectedLabId, setSelectedLabId] = useState("");
  const [projectUserEnumList, setProjectUserEnumList] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2", "Step 3"];

  useEffect(() => {
    console.log("Project state updated:", project);
    console.log("Custom skill list:", customSkillList);
    console.log("Custom asset list:", customAssetList);
    console.log("Team store:", teamStore);
  }, [project]);

  useEffect(() => {
    fetchEnums();
    setEnumsFetched(true);
  }, []);

  useEffect(() => {
    if (enumsFetched) {
      fetchBasicData();
    }
  }, [enumsFetched]);

  const fetchEnums = async () => {
    try {
      const skillsEnumResponse = await fetch(`${Base_url_skills}enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (skillsEnumResponse.ok) {
        const skillsData = await skillsEnumResponse.json();
        setSkillsEnumList(skillsData);
        console.log("Skills fetched:", skillsData);
      } else {
        console.error("Error fetching skills:");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }

    try {
      const labsEnumResponse = await fetch(`${Base_url_lab}enum`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (labsEnumResponse.ok) {
        const labsData = await labsEnumResponse.json();
        setLabEnumList(labsData);
        console.log("Labs fetched:", labsData);
      } else {
        console.error("Error fetching labs:");
      }
    } catch (error) {
      console.error("Error fetching labs:", error);
    }

    try {
      const projectUserEnumResponse = await fetch(
        `${Base_url_projects}user-enum`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: loggedUser.sessionToken,
            id: loggedUser.id,
          },
        }
      );
      if (projectUserEnumResponse.ok) {
        const projectUserData = await projectUserEnumResponse.json();
        setProjectUserEnumList(projectUserData);
        console.log("Project users fetched:", projectUserData);
      } else {
        console.error("Error fetching project users:");
      }
    } catch (error) {
      console.error("Error fetching project users:", error);
    }
  };

  const fetchBasicData = async () => {
    try {
      const urlAssets = new URL(Base_url_components_resources);
      urlAssets.searchParams.append("orderBy", "name");
      urlAssets.searchParams.append("orderAsc", "true");
      urlAssets.searchParams.append("pageSize", 500);
      urlAssets.searchParams.append("pageNumber", 1);

      const assetsResponse = await fetch(urlAssets, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (assetsResponse.ok) {
        const assetsData = await assetsResponse.json();
        setAssetsList(assetsData);
        console.log("Assets fetched:", assetsData);
        console.log("Assets list:", assetsList);
      } else {
        console.error("Error fetching assets");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const skillsResponse = await fetch(`${Base_url_skills}unconfirmed-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (skillsResponse.ok) {
        const skillsData = await skillsResponse.json();
        setSkillsList(skillsData);
        console.log("Skills fetched:", skillsData);
      } else {
        console.error("Error fetching skills");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }

    try {
      const keywordsResponse = await fetch(Base_url_keywords, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (keywordsResponse.ok) {
        const keywordsData = await keywordsResponse.json();
        setKeywordsList(keywordsData);
        console.log("Keywords fetched:", keywordsData);
      } else {
        console.error("Error fetching keywords");
      }
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }

    try {
      const urlUsers = new URL(Base_url_users);
      urlUsers.searchParams.append("workplace", 0);
      urlUsers.searchParams.append("orderBy", "lab");
      urlUsers.searchParams.append("orderAsc", "true");
      urlUsers.searchParams.append("pageSize", 100);
      urlUsers.searchParams.append("pageNumber", 1);

      const usersResponse = await fetch(urlUsers, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        userStore.getState().setUserList(usersData);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const maxUsersResponse = await fetch(`${Base_url_admins}max-members`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
      });
      if (maxUsersResponse.ok) {
        const maxUsersData = await maxUsersResponse.json();
        setMaxUsers(maxUsersData);
        console.log("Max users fetched:", maxUsersData);
      } else {
        console.error("Error fetching max users");
      }
    } catch (error) {
      console.error("Error fetching max users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    // start date is before today and after the end date
    if (new Date(newStartDate) > new Date(endDate)) {
      toast.error(t("startDateAfterEndDate"));
      return;
    } else if (
      new Date(newStartDate) <
      new Date(new Date().setDate(new Date().getDate() - 1))
    ) {
      toast.error(t("startDateBeforeYesterday"));
      return;
    }
    setStartDate(newStartDate);
    const formattedStartDate = `${newStartDate}T23:59:59`; // Adding time information
    setProject({ ...project, projectedStartDate: formattedStartDate });
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    // end date is before today and before or the same as the start date
    if (new Date(newEndDate) <= new Date(startDate)) {
      toast.error(t("endDateBeforeStartDate"));
      return;
    } else if (new Date(newEndDate) < new Date()) {
      toast.error(t("endDateBeforeToday"));
      return;
    }
    setEndDate(newEndDate);
    const formattedEndDate = `${newEndDate}T00:00:00`; // Adding time information
    setProject({ ...project, deadline: formattedEndDate });
  };

  const handleLabChange = (e) => {
    const newLabId = e.target.value;
    setSelectedLabId(newLabId);
    setProject({ labId: newLabId });
  };

  const generateKeywordsOptions = () => {
    let keywordsOptions = keywordsList.map((keyword) => keyword);
    if (keywordsInputValue.trim().length > 0) {
      const isKeywordExists = keywordsList.some(
        (keyword) =>
          keyword.toLowerCase() === keywordsInputValue.trim().toLowerCase()
      );
      if (!isKeywordExists) {
        keywordsOptions = keywordsOptions.concat(
          `Add "${keywordsInputValue}" as a new keyword`
        );
      }
    }
    return keywordsOptions;
  };

  const generateSkillOptions = () => {
    let skillOptions = skillsList.map((skill) => ({
      name: skill.name || skill,
    }));

    if (skillsInputValue.trim().length > 0) {
      const isSkillExist = skillsList.some(
        (skill) =>
          (skill.name || skill).toLowerCase() ===
          skillsInputValue.trim().toLowerCase()
      );

      if (!isSkillExist) {
        skillOptions = skillOptions.concat({
          name: `Add "${skillsInputValue}" as a skill`,
        });
      }
    }

    return skillOptions;
  };

  const generateAssetsOptions = () => {
    let assetsOptions = assetsList.map((asset) => ({
      name: `${asset.name || asset} by ${asset.brand || ""}`,
    }));

    if (assetsInputValue.trim().length > 0) {
      const isAssetExist = assetsList.some(
        (asset) =>
          (asset.name || asset).toLowerCase() ===
          assetsInputValue.trim().toLowerCase()
      );

      if (!isAssetExist) {
        assetsOptions = assetsOptions.concat({
          name: `Add "${assetsInputValue}" as an asset`,
        });
      }
    }

    return assetsOptions;
  };

  const generateTeamOptions = () => {
    // Map the users list to show on the options list the firstName and lastName of the users
    const teamOptions = usersList.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
    }));

    console.log("teamOptions:", teamOptions);

    return teamOptions;
  };

  const handleMaxMembersChange = (e) => {
    setProject({ ...project, maxMembers: e.target.value });
  };

  const handleKeywordInputChange = (value) => {
    setKeywordsInputValue(value);
  };

  const handleSkillsInputChange = (value) => {
    setSkillsInputValue(value);
  };

  const handleAssetsInputChange = (value) => {
    console.log("handleAssetsInputChange called with value:", value);
    setAssetsInputValue(value);
  };

  const handleTypeAheadKeywordsChange = (labelKey, selected) => {
    if (labelKey === "keywords") {
      const trimmedInputValue = keywordsInputValue.trim();
      if (
        trimmedInputValue.length > 0 &&
        selected.length > 0 &&
        selected[selected.length - 1].startsWith('Add "')
      ) {
        const newKeyword = trimmedInputValue;
        setKeywordsList([...keywordsList, newKeyword]);
        setProject({ ...project, keywords: [...project.keywords, newKeyword] });
      } else {
        setProject({ ...project, keywords: selected });
      }
    }
  };

  const handleTypeAheadSkillsChange = (labelKey, selected) => {
    console.log(
      "handleTypeAheadSkillsChange called with labelKey:",
      labelKey,
      "and selected:",
      selected
    );

    if (labelKey === "skills") {
      const trimmedInputValue = skillsInputValue.trim();
      console.log("trimmedInputValue:", trimmedInputValue);

      if (
        trimmedInputValue.length > 0 &&
        selected.length > 0 &&
        selected[selected.length - 1].name.startsWith('Add "')
      ) {
        setCustomSkill(trimmedInputValue);
        setShowSkillModal(true);
      } else if (selected.length > 0) {
        setShowSkills(selected);
        // find the selected skill id on the skillsList
        const selectedSkill = skillsList.find(
          (skill) => skill.name === selected[selected.length - 1].name
        );
        if (selectedSkill) {
          const selectedSkillId = selectedSkill.id;
          setProject({
            ...project,
            existentSkills: [...project.existentSkills, selectedSkillId],
          });
          setPreviousSelectedSkills(selected);
        }
      } else {
        // when user remove a skill from the typeahead input let's remove it from the project.existentSkills or from the customSkillList
        if (selected.length < previousSelectedSkills.length) {
          const removedSkill = previousSelectedSkills.find(
            (skill) => !selected.includes(skill)
          );
          console.log("Removed skill:", removedSkill);
          if (removedSkill.type === undefined) {
            const removedSkillObj = skillsList.find(
              (skill) => skill.name === removedSkill.name
            );

            if (removedSkillObj) {
              const removedSkillId = removedSkillObj.id;
              console.log("Removed skill id:", removedSkillId);
              setProject({
                ...project,
                existentSkills: project.existentSkills.filter(
                  (skillId) => skillId !== removedSkillId
                ),
              });
              console.log("Project existent skills:", project.existentSkills);
              // remove the skil from the showSkills list
              setShowSkills((prevShowSkills) =>
                prevShowSkills.filter(
                  (skill) => skill.name !== removedSkill.name
                )
              );
              setPreviousSelectedSkills((prevShowSkills) =>
                prevShowSkills.filter(
                  (skill) => skill.name !== removedSkill.name
                )
              );
            } else {
              console.error("Skill not found in skillsList");
            }
          } else {
            // remove the skill from the customSkillList and from the showSkills list
            const removedCustomSkill = customSkillList.find(
              (skill) => skill.name === removedSkill.name
            );
            console.log("Removed custom skill:", removedCustomSkill);
            if (removedCustomSkill) {
              setCustomSkillList((prevCustomSkillList) => {
                const updatedList = prevCustomSkillList.filter(
                  (skill) => skill.name !== removedCustomSkill.name
                );
                console.log("Updated custom skill list:", updatedList);
                return updatedList;
                console.log("Updated custom skill list 2:", updatedList);
              });
              console.log("Custom skill list 2:", customSkillList);
              setShowSkills((prevShowSkills) =>
                prevShowSkills.filter(
                  (skill) => skill.name !== removedCustomSkill.name
                )
              );
              setPreviousSelectedSkills((prevShowSkills) =>
                prevShowSkills.filter(
                  (skill) => skill.name !== removedCustomSkill.name
                )
              );
            }
          }
        }
      }
    }
  };

  const handleTypeAssetsAheadChange = (labelKey, selected) => {
    console.log(
      "handleTypeAssetsAheadChange called with labelKey:",
      labelKey,
      "and selected:",
      selected
    );
    if (labelKey === "assets") {
      const trimmedInputValue = assetsInputValue.trim();
      if (
        trimmedInputValue.length > 0 &&
        selected.length > 0 &&
        selected[selected.length - 1].name && // Check if label exists
        selected[selected.length - 1].name.startsWith('Add "')
      ) {
        setCustomAsset(trimmedInputValue);
        setAsset({
          ...asset,
          name: trimmedInputValue,
        });
        setShowAssetModal(true);
      } else if (selected.length > 0) {
        const selectedString = selected[selected.length - 1].name;
        const [name, brand] = selectedString.split(" by ");
        const selectedAsset = assetsList.find(
          (asset) => asset.name === name.trim() && asset.brand === brand.trim()
        );
        if (selectedAsset) {
          const selectedAssetId = selectedAsset.id;
          setSelectedAssetToModal(selected);
          setSelectedAssetIdToModal(selectedAssetId);
          console.log("Selected asset id:", selectedAssetId);
          setShowAssetQuantityModal(true);
        } else {
          console.error("Asset not found");
        }
      } else {
        // when user remove an asset from the typeahead input let's remove it from the customAssetList
        if (selected.length < previousSelectedAssets.length) {
          const removedAsset = previousSelectedAssets.find(
            (asset) => !selected.includes(asset)
          );
          console.log("Removed asset:", removedAsset);
          // filter if the removedAsset string includes " by "
          if (removedAsset.name.includes(" by ")) {
            // remove the asset with the name and brand from the project.existentResources, the name is before " by " and the brand is after
            const [name, brand] = removedAsset.name.split(" by ");
            const removedAssetObj = assetsList.find(
              (asset) =>
                asset.name === name.trim() && asset.brand === brand.trim()
            );
            // find the selected asset name and brand on the assetsList
            if (removedAssetObj) {
              const removedAssetId = removedAssetObj.id;
              console.log("Removed asset id:", removedAssetId);
              setProject({
                ...project,
                existentResources: new Map(
                  [...project.existentResources].filter(
                    ([key, value]) => key !== removedAssetId
                  )
                ),
              });
              setShowAssets((prevShowAssets) =>
                prevShowAssets.filter(
                  (asset) => asset.name !== removedAsset.name
                )
              );
              setPreviousSelectedAssets((prevShowAssets) =>
                prevShowAssets.filter(
                  (asset) => asset.name !== removedAsset.name
                )
              );
            } else {
              console.error("Asset not found in assetsList");
            }
          } else {
            // remove the asset from the customAssetList and from the showAssets list
            const removedCustomAsset = customAssetList.find(
              (asset) => asset.name === removedAsset.name
            );
            console.log("Removed custom asset:", removedCustomAsset);
            if (removedCustomAsset) {
              setCustomAssetList((prevCustomAssetList) => {
                const updatedList = prevCustomAssetList.filter(
                  (asset) => asset.name !== removedCustomAsset.name
                );
                console.log("Updated custom asset list:", updatedList);
                return updatedList;
              });
              console.log("Custom asset list:", customAssetList);
              setShowAssets((prevShowAssets) =>
                prevShowAssets.filter(
                  (asset) => asset.name !== removedCustomAsset.name
                )
              );
              setPreviousSelectedAssets((prevShowAssets) =>
                prevShowAssets.filter(
                  (asset) => asset.name !== removedCustomAsset.name
                )
              );
            }
          }
        }
      }
    }
  };

  const handleAddAsset = () => {
    if (assetQuantity <= 0) {
      toast.error(t("assetQuantityRequired"));
      return;
    } else {
      const existentResources =
        project.existentResources instanceof Map
          ? project.existentResources
          : new Map();

      // Ensure both key and value are integers
      const parsedAssetId = parseInt(selectedAssetIdToModal, 10);
      const parsedAssetQuantity = parseInt(assetQuantity, 10);

      setProject({
        ...project,
        existentResources: new Map([
          ...existentResources,
          [parsedAssetId, parsedAssetQuantity],
        ]),
      });
      setShowAssets(selectedAssetToModal);
      setPreviousSelectedAssets(selectedAssetToModal);
      setShowAssetQuantityModal(false);
      setAssetQuantity(1);
    }
  };

  const handleCancelQuantityModal = () => {
    setShowAssetQuantityModal(false);
    setAssetQuantity(1);
    setShowAssets([]);
  };

  const handleTypeTeamAheadChange = (labelKey, selected) => {
    console.log(
      "handleTypeTeamAheadChange called with labelKey:",
      labelKey,
      "and selected:",
      selected
    );

    if (labelKey === "members") {
      if (selected.length > previousSelectedTeam.length) {
        // Adding a user
        setNameToTeamModal(selected[selected.length - 1].name);
        console.log(
          "Selected user name xxx:",
          selected[selected.length - 1].name
        );
        // Find the selected user id on the usersList
        const selectedUserId = usersList.find(
          (user) =>
            user.firstName + " " + user.lastName ===
            selected[selected.length - 1].name
        ).id;

        setIdToTeamModal(selectedUserId);
        console.log("Selected user id xxx:", selectedUserId);
        setShowTeamModal(true);
        setShowUsers(selected);
        setPreviousSelectedTeam(selected);
        console.log("Show users:", showUsers);
      } else {
        // Removing a user
        if (selected.length < previousSelectedTeam.length) {
          const removedUser = previousSelectedTeam.find(
            (user) => !selected.includes(user)
          );
          console.log("Removed user:", removedUser);
          if (removedUser) {
            console.log("Removed user name:", removedUser.name);
            // Find user id by firstName and lastName
            const removedUserId = usersList.find(
              (user) =>
                user.firstName + " " + user.lastName === removedUser.name
            ).id;
            if (removedUserId) {
              console.log("Removed user id:", removedUserId);
              setTeamStore((prevTeamStore) =>
                prevTeamStore.filter((user) => user.userId !== removedUserId)
              );
              console.log("User removed from team store");
              setShowUsers((prevShowUsers) =>
                prevShowUsers.filter((user) => user.name !== removedUser.name)
              );

              setShowTeamModal(false);
            } else {
              console.error("User not found in usersList");
            }
          }
        }
      }
    }
  };

  const handleAddMember = () => {
    if (teamStore.length >= maxUsers - 1) {
      toast.error(t("maxMembersReached"));
      return;
    } else {
      const userId = parseInt(idToTeamModal, 10);
      const userType = parseInt(teamType, 10);

      // Update teamStore with a new object instead of a Map
      setTeamStore([...teamStore, { userId, userType }]);
      console.log("Team Store:", [...teamStore, { userId, userType }]); // Log the updated state
      setShowTeamModal(false);
    }
  };

  const handleCloseTeamModal = () => {
    setShowTeamModal(false);
    setShowUsers([]);
  };

  const handleSkillTypeChange = (e) => {
    setSkillType(e.target.value);
  };

  const handleAddCustomSkill = () => {
    console.log("Skill type:", skillType);
    if (!skillType) {
      console.log("Skill type is missing");
      toast.error(t("skillTypeRequired"));
      return;
    } else {
      const newSkill = {
        name: customSkill,
        type: skillType,
      };
      setCustomSkillList((prevCustomSkillList) => {
        const updatedList = [...prevCustomSkillList, newSkill];
        console.log("Updated custom skill list:", updatedList);
        return updatedList;
      });
      setShowSkills((prevShowSkills) => [...prevShowSkills, newSkill]);
      setPreviousSelectedSkills((prevShowSkills) => [
        ...prevShowSkills,
        newSkill,
      ]);
      setCustomSkill("");
      setSkillType("");
      setSkillsInputValue("");
      console.log("Custom skill list:", customSkillList);
      setShowSkillModal(false);
    }
  };

  const handleAddCustomAsset = () => {
    if (
      !asset.type ||
      !asset.name ||
      !asset.description ||
      !asset.partNumber ||
      !asset.brand ||
      !asset.supplier ||
      !asset.supplierContact ||
      !asset.quantity
    ) {
      console.log("Asset data is missing");
      toast.error(t("assetDataRequired"));
      return;
    }

    setCustomAssetList((prevCustomAssetList) => {
      const updatedList = [...prevCustomAssetList, asset];
      console.log("Updated custom asset list:", updatedList);
      return updatedList;
    });
    setShowAssets((prevShowAssets) => [...prevShowAssets, asset]);
    setPreviousSelectedAssets((prevShowAssets) => [...prevShowAssets, asset]);
    setAsset({ type: 1 });
    setAssetsInputValue("");
    setShowAssetModal(false);
  };

  const handleAssetTypeChange = (type) => {
    setAssetType(type);
    setAsset({
      ...asset,
      type: type === "Component" ? 1 : 2,
    });
  };

  const handleAssetChange = (e) => {
    setAsset({
      ...asset,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    clearProject();
    setTeamStore([]);
    setCustomAssetList([]);
    setStartDate("");
    setEndDate("");
    setSelectedLabId("");
    setShowSkills([]);
    setCustomSkillList([]);
    setStep(1);
    // clear all fields and go back to step 1
  };

  const validateStep1 = () => {
    if (!project.name || !project.description || !project.keywords.length > 0) {
      toast.error(t("projectNameDescKeywordsRequired"));
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!project.labId) {
      toast.error(t("labRequired"));
      return false;
    } else if (!project.projectedStartDate || !project.deadline) {
      toast.error(t("datesRequired"));
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      return;
    } else if (step === 2 && !validateStep2()) {
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const formatCategoryName = (name) => {
    return name
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = async () => {
    if (!project.name || !project.description || !project.keywords.length > 0) {
      toast.error(t("projectNameDescKeywordsRequired"));
      return;
    }
    console.log("Project no handle submit:", project);
    console.log("Team no handle submit:", teamStore);
    console.log("Assets no handle submit:", customAssetList);
    console.log("Skills no handle submit:", customSkillList);

    const projectData = new FormData();
    projectData.append("project", JSON.stringify(project));
    if (teamStore.length > 0) {
      // Flatten the teamStore array into a single map
      const teamMap = teamStore.reduce((acc, member) => {
        acc[member.userId] = member.userType;
        return acc;
      }, {});
      projectData.append("team", JSON.stringify(teamMap));
    }
    if (assetsList.length > 0) {
      projectData.append("components", JSON.stringify(customAssetList));
    }
    if (skillsList.length > 0) {
      projectData.append("skills", JSON.stringify(customSkillList));
    }

    try {
      const newProjectResponse = await fetch(Base_url_projects, {
        method: "POST",
        headers: {
          token: loggedUser.sessionToken,
          id: loggedUser.id,
        },
        body: projectData,
      });
      if (newProjectResponse.ok) {
        const newProject = await newProjectResponse.json();
        const newProjectId = newProject.id;
        toast.success(t("projectCreated"));
        clearProject();
        navigate("/domcast/myprojects");
      } else {
        toast.error(t("projectNotCreated"));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card
            className="justify-content-center align-items-center mt-3"
            style={{ border: "none" }}
          >
            <Row style={{ justifyContent: "center" }}>
              <FloatingLabel
                controlId="floatingName"
                label="Name *"
                className="mb-3 ps-1"
                style={{ width: "25rem" }}
              >
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <FloatingLabel
                controlId="floatingDescription"
                label="Description & motivation *"
                className="mb-3 ps-1"
                style={{ width: "25rem" }}
              >
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={handleChange}
                  style={{
                    height: "12.5rem",
                    resize: "none",
                    width: "24rem",
                    overflow: "auto",
                  }}
                  required
                />
              </FloatingLabel>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Col className="my-2">
                <Typeahead
                  id="keyword-search"
                  labelKey="name"
                  multiple
                  options={generateKeywordsOptions()}
                  selected={project?.keywords ?? []}
                  onInputChange={handleKeywordInputChange}
                  onChange={(selected) =>
                    handleTypeAheadKeywordsChange("keywords", selected)
                  }
                  placeholder="Search or add keyword... *"
                  className="mb-3 ps-1"
                  style={{ width: "18.5rem" }}
                />
              </Col>
            </Row>
            <span
              className="d-block text-center"
              style={{
                fontSize: "0.8rem",
                fontStyle: "italic",
                color: "var(--color-blue-02)",
                fontWeight: "bold",
              }}
            >
              {t("*mandatoryFields")}
            </span>
          </Card>
        );
      case 2:
        return (
          <Card
            className="justify-content-center align-items-center mt-3"
            style={{ border: "none" }}
          >
            <Form.Select
              controlId="floatingLab"
              name="labId"
              className="my-2 ps-1"
              style={{ width: "25rem" }}
              onChange={handleLabChange}
              value={selectedLabId} // Ensure the value is correctly set
            >
              <option value="" disabled>
                {t("chooseLab *")}
              </option>
              {labEnumList.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {formatCategoryName(lab.name)}
                </option>
              ))}
            </Form.Select>
            <Row className="my-2">
              <Col>
                <FloatingLabel
                  controlId="floatingStartDate"
                  label="Start Date *"
                >
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    style={{ width: "11.75rem" }}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingEndDate" label="End Date *">
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    style={{ width: "11.75rem" }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="my-2" style={{ justifyContent: "center" }}>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Typeahead
                  id="skills-typeahead"
                  labelKey="name"
                  multiple
                  options={generateSkillOptions()}
                  selected={showSkills ?? []}
                  onInputChange={handleSkillsInputChange}
                  onChange={(selected) =>
                    handleTypeAheadSkillsChange("skills", selected)
                  }
                  placeholder="Choose your skills..."
                  className="mb-3"
                  style={{ width: "25rem" }}
                />
              </Col>
            </Row>
            <span
              className="d-block text-center"
              style={{
                fontSize: "0.8rem",
                fontStyle: "italic",
                color: "var(--color-blue-02)",
                fontWeight: "bold",
              }}
            >
              {t("*mandatoryFields")}
            </span>
          </Card>
        );
      case 3:
        return (
          <>
            <Card
              className="justify-content-center align-items-center mt-3"
              style={{ border: "none" }}
            >
              <Row className="my-2">
                <Col>
                  <span className="mb-3 mx-3">Maximum team members</span>
                  <Input
                    controlId="floatingTeamMembersNo"
                    type="number"
                    min="1"
                    max={maxUsers}
                    onChange={handleMaxMembersChange}
                    className="mb-3 ps-1"
                    style={{ width: "5rem" }}
                  />
                </Col>
              </Row>
              <Row className="my-2">
                <Col>
                  <FloatingLabel
                    controlId="floatingMembers"
                    className="mb-3 ps-1"
                  >
                    <Typeahead
                      id="member-typeahead"
                      labelKey="name"
                      multiple
                      options={generateTeamOptions()}
                      selected={showUsers ?? []}
                      onChange={(selected) =>
                        handleTypeTeamAheadChange("members", selected)
                      }
                      placeholder="Search user..."
                      className="mb-3"
                      style={{ width: "25rem" }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingAssets"
                    className="mb-3 ps-1"
                  >
                    <Typeahead
                      id="asset-search"
                      labelKey="name"
                      multiple
                      options={generateAssetsOptions()}
                      selected={showAssets ?? []}
                      onInputChange={handleAssetsInputChange}
                      onChange={(selected) =>
                        handleTypeAssetsAheadChange("assets", selected)
                      }
                      placeholder="Search asset..."
                      className="mb-3"
                      style={{ width: "25rem" }}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Card>
            <Card className="my-2 mx-3" style={{ border: "none" }}>
              <Row style={{ justifyContent: "center", gap: "3rem" }}>
                <Button
                  onClick={handleCancel}
                  className="btn-cancel"
                  style={{ width: "10rem" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="btn-save"
                  style={{ width: "10rem" }}
                >
                  Save
                </Button>
              </Row>
            </Card>
          </>
        );
      default:
        return null;
    }
  };

  const renderProgress = () => {
    return (
      <Row className="mb-2" style={{ justifyContent: "center", gap: "2rem" }}>
        {step > 1 && (
          <Button
            onClick={prevStep}
            className="nav-btn nav-btn-prev"
            style={{
              maxWidth: "8rem",
            }}
          >
            « Previous
          </Button>
        )}
        {step < 3 && (
          <Button
            onClick={nextStep}
            className="nav-btn nav-btn-next"
            style={{
              maxWidth: "8rem",
            }}
          >
            Next »
          </Button>
        )}
      </Row>
    );
  };

  return (
    <>
      <Modal
        show={showAssetQuantityModal}
        onHide={() => setShowAssetQuantityModal(false)}
        assetid={selectedAssetIdToModal}
        selected={selectedAssetToModal}
      >
        <Modal.Header closeButton className="mt-2 p-4">
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Choose quantity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={assetQuantity}
            onChange={(e) => setAssetQuantity(e.target.value)}
            className="mb-3 mx-5"
            style={{ width: "22.5rem" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCancelQuantityModal}
            className="modal-skill-interest-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddAsset}
            className="modal-skill-interest-save-btn"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSkillModal}
        onHide={() => setShowSkillModal(false)}
        customSkill={customSkill}
      >
        <Modal.Header closeButton className="mt-2 p-4">
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            Add Custom Skill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter custom skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="mb-3 mx-5"
            style={{ width: "22.5rem" }}
          />
          <Form.Select
            controlId="floatingSkill"
            style={{ width: "22.5rem" }}
            className="mb-3 mx-5"
            value={skillType}
            onChange={handleSkillTypeChange}
          >
            <option value="" disabled>
              Choose skill category
            </option>
            {skillsEnumList.map((category) => (
              <option key={category.id} value={category.id}>
                {formatCategoryName(category.name)}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSkillModal(false)}
            className="modal-skill-interest-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddCustomSkill}
            className="modal-skill-interest-save-btn"
          >
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTeamModal}
        onHide={handleCloseTeamModal}
        nameToTeamModal={nameToTeamModal}
        idToTeamModal={idToTeamModal}
        projectsEnumList={projectUserEnumList}
      >
        <Modal.Header closeButton className="mt-2 p-4">
          <Modal.Title style={{ width: "100%", textAlign: "center" }}>
            <span style={{ color: "var(--color-blue-03)" }}>
              {nameToTeamModal}
            </span>
            <p style={{ fontSize: "16px" }}>
              Will be added to {project.name} project. Choose its role.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            controlId="floatingMemberCategory"
            value={teamType}
            onChange={(e) => setTeamType(e.target.value)}
            style={{ width: "22.5rem" }}
            className="mb-3 mx-5"
          >
            <option value="" disabled>
              Choose role
            </option>
            {projectUserEnumList
              .filter((userEnum) => userEnum.id === 2 || userEnum.id === 3)
              .map((userEnum) => (
                <option key={userEnum.id} value={userEnum.id}>
                  {formatCategoryName(userEnum.name)}
                </option>
              ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseTeamModal}
            className="modal-team-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddMember}
            className="modal-team-save-btn"
          >
            Add Member
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAssetModal}
        onHide={() => setShowAssetModal(false)}
        customAsset={customAsset}
      >
        <Modal.Header closeButton>
          <Row className="justify-content-center my-2">
            <Modal.Title style={{ color: "var(--color-blue-03)" }}>
              Add New Asset
            </Modal.Title>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Row className="my-4">
            <Col className="justify-content-center d-flex mb-3">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-outline-secondary btn-custom-asset ${
                    assetType === "Component" ? "active" : ""
                  }`}
                  onClick={() => handleAssetTypeChange("Component")}
                  style={{
                    width: "8rem",
                    height: "3rem",
                    fontWeight: "bold",
                  }}
                >
                  Component
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-secondary btn-custom-asset ${
                    assetType === "Resource" ? "active" : ""
                  }`}
                  onClick={() => handleAssetTypeChange("Resource")}
                  style={{
                    width: "8rem",
                    height: "3rem",
                    fontWeight: "bold",
                  }}
                >
                  Resource
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingName"
                label="Name *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={asset.name}
                  onChange={handleAssetChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingDescription"
                label="Description *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="description"
                  value={asset.description}
                  onChange={handleAssetChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPartNumber"
                label="Part Number *"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="partNumber"
                  value={asset.partNumber}
                  onChange={handleAssetChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingBrand"
                label="Brand *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="brand"
                  value={asset.brand}
                  onChange={handleAssetChange}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={6}>
              <FloatingLabel
                controlId="floatingSupplier"
                label="Supplier *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="supplier"
                  value={asset.supplier}
                  onChange={handleAssetChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingSupplierContact"
                label="Supplier Contact *"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="supplierContact"
                  value={asset.supplierContact}
                  onChange={handleAssetChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingQuantity"
                label="Quantity *"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  name="quantity"
                  value={asset.quantity}
                  onChange={handleAssetChange}
                  min={1}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingNotes"
                label="Notes"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  name="observations"
                  value={asset.observations}
                  onChange={handleAssetChange}
                  style={{ resize: "none" }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="justify-content-center my-1">
            <p
              className="my-1"
              style={{
                fontSize: "15px",
                color: "var(--color-blue-01)",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
              }}
            >
              All fields required (except notes)
            </p>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center my-3">
          <Button
            variant="secondary"
            onClick={() => setShowAssetModal(false)}
            className="modal-add-asset-cancel-btn mx-2"
            style={{ width: "8rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddCustomAsset}
            className="modal-add-asset-save-btn mx-2"
            style={{ width: "8rem" }}
          >
            Add Asset
          </Button>
        </Modal.Footer>
      </Modal>

      <Card
        style={{
          border: "none",
          height: "100%",
          width: "100%",
          position: "relative", // Add this to enable absolute positioning for children
        }}
      >
        <div
          className="progress-bar-div"
          style={{
            width: "30%",
            justifyContent: "center",
            position: "absolute", // Absolute positioning
            top: "2rem", // 10rem from the top
            left: "50%", // Center horizontally
            transform: "translateX(-50%)", // Center align by translating half of its width
          }}
        >
          <OthersProgressBar step={step} steps={steps} />
        </div>

        <div style={{ paddingTop: "2.5rem" }}>
          {" "}
          {/* Add paddingTop to push the content down */}
          <Card style={{ border: "none" }} className="my-3">
            {renderStep()}
          </Card>
          <div className="my-2">{renderProgress()}</div>
        </div>
      </Card>
    </>
  );
};

export default ProjectNew;
